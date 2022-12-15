

(function () {
    var main_DIV = document.createElement("div");
    main_DIV.id = "main_DIV";

    /* -------------------------------------------------------------------------- */
    /*                    Starting to add sidebar with submenu                    */
    /* -------------------------------------------------------------------------- */
    main_DIV.innerHTML = '<div id="mySidenav" class="sidenav">  <a id="closeNavBtn" class="closebtn">&times;</a>  <a href="#">About</a>  <a href="#">Services</a>  <a href="#">Clients</a>  <a href="#">Contact</a></div>'
    var button = document.createElement("button");
    button.classList.add("btn","border-0","warning","d-inline-flex","background-warning","justify-content-center","align-items-center");
    button.setAttribute("type","button");
    button.id = "main_button";
    button.innerHTML = '<i class="fab pe-1 fa-chromecast text-dark"></i> <h4 class="text-dark">moviesdirect</h4>';
    
    main_DIV.appendChild(button);
    document
      .getElementById("home_img_holder")
      .insertAdjacentElement("afterend",main_DIV);

    /* ----------- It designates the events to the button for sidebar ----------- */
    function addEventToElement() {
      /* -------------- for launching the sidebar using #main_button -------------- */
      document
        .getElementById("main_button")
        .addEventListener("click", function () {
          document.getElementById("mySidenav").style.width = "250px";
        });
      /* ---------- for closing the sidebar using the X button on the bar --------- */
      document
        .getElementById("closeNavBtn")
        .addEventListener("click", function () {
          
      document.getElementById("mySidenav").style.width = "0px";
        });
    }
    addEventToElement();
})();