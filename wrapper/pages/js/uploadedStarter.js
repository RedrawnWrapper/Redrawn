const params = new Proxy(new URLSearchParams(window.location.search), {
         get: (searchParams, prop) => searchParams.get(prop),
});
if (params.returnMessage == "null" || "undefined") {
         var 
