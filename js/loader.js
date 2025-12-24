
let percent = 0;
let loaderInterval;

function startLoader() {
    loaderInterval = setInterval(() => {
        percent++;
        document.getElementById("loader-percent").innerText = percent + "%";
        document.getElementById("loader-bar").style.width = percent + "%";

        if (percent >= 100) {
            clearInterval(loaderInterval);
            document.getElementById("loader").classList.add("fade-out");
            setTimeout(() => {
                document.getElementById("loader").style.display = "none";
            }, 800);
        }
    }, 20);
}


document.addEventListener("click", function skipLoader() {
    if (percent < 100) {
        percent = 100;
        document.getElementById("loader-percent").innerText = "100%";
        document.getElementById("loader-bar").style.width = "100%";
        clearInterval(loaderInterval);
        document.getElementById("loader").classList.add("fade-out");
        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 800);
    }
});


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startLoader);
} else {
    startLoader();
}
