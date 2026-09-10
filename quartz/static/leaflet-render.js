document.addEventListener("nav", () => {
  const leafletBlocks = document.querySelectorAll("pre code.language-leaflet");
  
  leafletBlocks.forEach((block, index) => {
    const parent = block.parentElement;
    const textContent = block.textContent;
    
    const imageMatch = textContent.match(/image:\s*([^\n]+)/);
    const heightMatch = textContent.match(/height:\s*([^\n]+)/);
    
    if (!imageMatch) return;
    
    let imagePath = imageMatch[1].trim().replace(/\[\[\vert{}\]\]/g, "");
    const height = heightMatch ? heightMatch[1].trim() : "600px";
    
    const mapContainer = document.createElement("div");
    mapContainer.id = `leaflet-map-${index}`;
    mapContainer.style.height = height;
    mapContainer.style.width = "100%";
    mapContainer.style.borderRadius = "8px";
    mapContainer.style.margin = "1em 0";
    
    parent.replaceWith(mapContainer);
    
    const img = new Image();
    img.src = imagePath;
    img.onload = () => {
      const w = img.width;
      const h = img.height;
      
      const map = L.map(mapContainer.id, {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 2,
      });
      
      const bounds = [[0, 0], [h, w]];
      L.imageOverlay(imagePath, bounds).addTo(map);
      map.fitBounds(bounds);
    };
  });
});
