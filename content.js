console.log("Hello from content.js");

// 페이지 로드 후 실행
window.addEventListener("load", function () {
  const currentUrl = window.location.href;
  const urlParts = currentUrl.split("/");
  var username = urlParts[3];
  var reponame = urlParts[4];
  var refs = currentUrl.split("..");
  var baseRef = currentUrl.split("compare/")[0];
  var headRef = refs[1];
  console.log(username, reponame, refs, baseRef, headRef);
  var branchData = localStorage.getItem(
    `ref-selector:${username}/${reponame}:branch`
  );

  if (branchData) {
    const branches = JSON.parse(branchData).refs;
    console.log(branches);

    // 드롭다운 생성
    var select = document.createElement("select");
    select.setAttribute("class", "my-1 form-control input-sm");
    select.setAttribute("id", "branch-select");
    select.setAttribute("size", "10"); // dropdown을 리스트처럼 보이게 하기 위해 추가

    // 기본 옵션 추가
    var defaultOption = document.createElement("option");
    defaultOption.setAttribute("value", "");
    defaultOption.textContent = "Select a branch";
    select.appendChild(defaultOption);

    // 브랜치 옵션 추가
    branches.forEach(function (branch) {
      var option = document.createElement("option");
      option.setAttribute("value", branch);
      option.textContent = branch;
      select.appendChild(option);
    });

    var targetElement = document.getElementsByClassName("SelectMenu-tabs")[0];
    if (targetElement) {
      targetElement.insertBefore(select, targetElement.firstChild);
    } else {
      console.log("Target element not found for dropdown");
    }

    // 드롭다운에 입력 필드 이벤트 리스너 추가
    select.addEventListener("input", function () {
      var filter = select.value.toLowerCase();
      var options = select.options;
      for (var i = 1; i < options.length; i++) {
        var option = options[i];
        var text = option.textContent.toLowerCase();
        if (text.includes(filter)) {
          option.style.display = "";
        } else {
          option.style.display = "none";
        }
      }
    });

    // 드롭다운에 변경 이벤트 리스너 추가
    select.addEventListener("change", function () {
      var selectedBranch = select.value;
      if (selectedBranch) {
        var newUrl = `https://github.com/${username}/${reponame}/compare/${selectedBranch}..${headRef}`;
        window.location.href = newUrl;
      }
    });
  }
});
