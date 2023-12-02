const route = (event) => {
    event = event || window.event
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
}

const routes = {
    404: new URL('@/pages/404.html', import.meta.url).href,
    "/": new URL('@/pages/home.html', import.meta.url).href,
    // "/projects": new URL('@/pages/projects.html', import.meta.url).href,
}

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById('main-page').innerHTML = html;
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();

export { route };