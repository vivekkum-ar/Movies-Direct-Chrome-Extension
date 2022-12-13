(function () {
    var main_DIV = document.createElement("div");
    main_DIV.id = "main_DIV";
    var button = document.createElement("button");
    button.classList.add("btn","border-0","warning","d-inline-flex","background-warning","justify-content-center","align-items-center");
    button.setAttribute("type","button");
    button.id = "main_button";
    button.innerHTML = '<i class="fab pe-1 fa-chromecast text-dark"></i> <h4 class="text-dark">moviesdirect</h4>';
    main_DIV.appendChild(button);
    // document.getElementById("home_img_button").nextElementSibling.insertBefore(main_DIV);
    document.getElementById("home_img_holder").insertAdjacentElement("afterend",main_DIV);
})();