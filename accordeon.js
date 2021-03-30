var allTitle = document.querySelectorAll(".accordeon li");
// we get big title

// we set up an onclick function for each big title
for (let oneTitle of allTitle) {
    oneTitle.onclick = function () {
        if (this.className == "open") {
            this.className = "";
        } else {
            for (let oneOfTitle of allTitle) {
                oneOfTitle.className = "";
            }
            this.className = "open";
        }
    };
}
