function extractDataFromHTML(doc) {
    const liElements = doc.querySelectorAll('article.otd-row.otd-detail ul.list--big li');
    const events = [];
  
    liElements.forEach((li) => {
      const titleElement = li.querySelector('h3.otd-title');
      const descriptionElement = li.querySelector('p.otd-text');
      const yearElement = li.querySelector('h3.otd-title strong');
  
      if (titleElement && descriptionElement && yearElement) {
        const event = {
          year: yearElement.textContent.trim(),
          title: titleElement.textContent.replace(yearElement.textContent, '').trim(),
          description: descriptionElement.textContent.trim()
        };
        events.push(event);
      }
    });
  
    return events;
  }
  