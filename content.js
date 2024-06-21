console.log("Hello from content.js");

window.addEventListener("load", function () {
  const currentUrl = window.location.href;
  const urlParts = currentUrl.split("/");
  var username = urlParts[3];
  var reponame = urlParts[4];
  var refs = currentUrl.split("..");
  var baseRef = refs[0].split("compare/")[1];
  var headRef = refs[1];
  var branchData = localStorage.getItem(
    `ref-selector:${username}/${reponame}:branch`
  );

  if (branchData) {
    const branches = JSON.parse(branchData).refs;
    console.log(branches);

    function createDropdownWithFilter(targetElement, refType) {
      var container = document.createElement("div");
      container.setAttribute("class", "dropdown-container my-1");

      var input = document.createElement("input");
      input.setAttribute("class", "form-control input-sm");
      input.setAttribute("placeholder", "Search branches");

      var select = document.createElement("select");
      select.setAttribute("class", "form-control input-sm");
      select.setAttribute("id", "branch-select");
      select.setAttribute("size", "10");

      var defaultOption = document.createElement("option");
      defaultOption.setAttribute("value", "");
      defaultOption.textContent = "Select a branch";
      select.appendChild(defaultOption);

      branches.forEach(function (branch) {
        var option = document.createElement("option");
        option.setAttribute("value", branch);
        option.textContent = branch;
        select.appendChild(option);
      });

      container.appendChild(input);
      container.appendChild(select);

      if (targetElement) {
        targetElement.insertBefore(container, targetElement.firstChild);
      } else {
        console.log("Target element not found for dropdown");
      }
      input.addEventListener("input", function () {
        var options = select.options;
        for (var i = 1; i < options.length; i++) {
          var option = options[i];
          var text = option.textContent.toLowerCase();
          if (text.includes(input.value)) {
            option.style.display = "";
          } else {
            option.style.display = "none";
          }
        }
      });

      select.addEventListener("change", function () {
        var selectedBranch = select.value;
        if (selectedBranch) {
          var newUrl;
          if (refType === "base") {
            newUrl = `https://github.com/${username}/${reponame}/compare/${selectedBranch}..${headRef}`;
          } else if (refType === "head") {
            newUrl = `https://github.com/${username}/${reponame}/compare/${baseRef}..${selectedBranch}`;
          }
          window.location.href = newUrl;
        }
      });
    }

    var targetElements = document.getElementsByClassName("SelectMenu-tabs");
    if (targetElements.length > 0) {
      createDropdownWithFilter(targetElements[0], "base");
    }
    if (targetElements.length > 1) {
      createDropdownWithFilter(targetElements[1], "head");
    }
  }
});
