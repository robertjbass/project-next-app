const rules = [
  [/#{6}\s?([^\n]+)\n/g, '<h6>$1</h6>'],
  [/#{5}\s?([^\n]+)\n/g, '<h5>$1</h5>'],
  [/#{4}\s?([^\n]+)\n/g, '<h4>$1</h4>'],
  [/#{3}\s?([^\n]+)\n/g, '<h3>$1</h3>'],
  [/#{2}\s?([^\n]+)\n/g, '<h2>$1</h2>'],
  [/#{1}\s?([^\n]+)\n/g, '<h1>$1</h1>'],
  [/([^\n]+)\ns+=+/g,'<h1>$</h1><hr/>'],
  [/([^\n]+)\ns+-+/g,'<h2>$</h2><hr/>'],
  [/\**(?:^|[^*])(\*\*(\w+(\s\w+)*)\*\*)/g,'<b>$1</b>'],
  [/\*([^*\n]+)\*/g, '<i>$1</i>'],
  [/__([^_]+)__/g, '<b>$1</b>'],
  [/_([^_]+)_/g, '<i>$1</i>'],      
  [/((\n\d\..+)+)/g, '<ol>$1</ol>'],
  [/((\n\*.+)+)/g, '<ul>$1</ul>'],
  [/\n\d\.([^\n]+)/g, '<li>$1</li>'],
  [/\n\*([^\n]+)/g, '<li>$1</li>'],
  [/(?:!\[(.*?)\]\((.*?)\))/g, '<img src="$1">'],
  [/\[([^\]]+)\]\(([^)]+)\)/g, '<a style="text-decoration: none" class="light-blue--text" href="$2">$1</a>'],
  [/\n/g, '<br />']
]


 


export default {
  bind(el) {
    let html = el.textContent;
    rules.forEach(([rule, template]) => {
      html = html.replace(rule,template).replace("```", `<code style="width: 100%; display: flex; margin: auto;">`).replace("```", `</code>`)
    })
    el.innerHTML = html
  }
}