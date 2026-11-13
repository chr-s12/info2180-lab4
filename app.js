//JAVASCRIPT 
document.getElementById("search").addEventListener("click", () => {
  const query = document.getElementById("check").value.trim();
  const result = document.getElementById("result");
    fetch("superheroes.php?query="+ encodeURIComponent(query))
    .then(response => response.json())
    .then(data => {result.innerHTML = "";
        
    

          // Read the HTML that superheroes.php sends back
      const page = new DOMParser().parseFromString(data, "text/html");
 
      // Figure 2: empty search shows the list of names (divs, no ul/li)
      if (query === "") {
        // The PHP file ends with a second list of aliases, which is the one in Figure 2
        const lists = page.querySelectorAll("ul");
        const aliases = lists[lists.length - 1].children;
 
        Array.from(aliases).forEach(alias => {
          const item = document.createElement("div");
          item.className = "hero-name";
          item.textContent = alias.textContent;
          result.appendChild(item);
        });
        return;
      }
 
      // Figure 5: no match (no <h2> comes back, only the not found message)
      if (!page.querySelector("h2")) {
        const error = document.createElement("p");
        error.className = "error";
        error.style.color = "#CC2222";
        error.textContent = "Superhero not found";
        result.appendChild(error);
        return;
      }
 
      // Figure 4: one specific superhero
      const name = document.createElement("h3");
      name.textContent = page.querySelector("h2").textContent;   // alias, e.g. Captain America
 
      const alias = document.createElement("h4");
      alias.textContent = page.querySelector("h3").textContent;  // "A.K.A. Steve Rogers"
 
      const bio = document.createElement("p");
      bio.textContent = page.querySelector("p").textContent;
 
      result.append(name, alias, bio);
    })
    .catch(error => console.error("Error:", error));
});

