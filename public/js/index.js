const ready = () => {
    getTodos("/todos");
    document.getElementById("sortby").value = "status";
};

if (document.readyState != "loading") {
    ready();
} else {
    document.addEventListener("DOMContentLoaded", ready);
}
