console.log("Hello from content.js");

// 페이지 로드 후 실행
window.addEventListener("load", function () {
  // 입력 필드 생성
  var input = document.createElement("input");
  input.setAttribute("class", "my-1 form-control input-sm");
  input.setAttribute("id", "my-input");
  input.setAttribute("placeholder", "Search branches");
  var targetElement = document.getElementsByClassName("SelectMenu-tabs")[0];
  if (targetElement) {
    targetElement.insertBefore(input, targetElement.firstChild);
  } else {
    console.log("Target element not found");
  }

  var branchData = localStorage.getItem(
    "ref-selector:username/reponame:branch"
  );
  if (branchData) {
    var branches = JSON.parse(branchData).refs;

    var branchListContainer = document.createElement("div");
    branchListContainer.setAttribute("id", "branch-list");
    targetElement.appendChild(branchListContainer);

    branches.forEach(function (branch) {
      var branchItem = document.createElement("div");
      branchItem.setAttribute("class", "branch-name");
      branchItem.setAttribute("style", "display: none;");
      branchItem.textContent = branch;
      branchListContainer.appendChild(branchItem);
    });

    var existingBranches = document.getElementsByClassName(
      "flex-1 css-truncate css-truncate-overflow"
    );
    Array.from(existingBranches).forEach(function (branch) {
      branch.style.display = "none";
    });

    input.addEventListener("input", function () {
      var filter = input.value.toLowerCase();
      var branchItems = document.getElementsByClassName("branch-name");

      Array.from(branchItems).forEach(function (branchItem) {
        var text = branchItem.textContent || branchItem.innerText;
        if (text.toLowerCase().includes(filter)) {
          branchItem.style.display = "";
        } else {
          branchItem.style.display = "none";
        }
      });
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        var filter = input.value;
        var currentUrl = window.location.href;
        var newUrl = currentUrl.split("compare/");
        window.location.href = newUrl;
      }
    });
  } else {
    console.log("No branch data found in localStorage");
  }
});
