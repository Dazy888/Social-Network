"use strict";for(var buttons=document.querySelectorAll("button"),_loop_1=function(t){t.onclick=function(){var i=t.closest("div").nextElementSibling;i.hasAttribute("big")&&0===i.getBoundingClientRect().height?i.classList.add("show-big"):i.hasAttribute("big")&&0!==i.getBoundingClientRect().height&&i.classList.remove("show-big"),i.hasAttribute("small")&&0===i.getBoundingClientRect().height?i.classList.add("show-small"):i.hasAttribute("small")&&0!==i.getBoundingClientRect().height&&i.classList.remove("show-small")}},_i=0,buttons_1=buttons;_i<buttons_1.length;_i++){var button=buttons_1[_i];_loop_1(button)}