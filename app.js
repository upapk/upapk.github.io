const hashToTest = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a'
const hashString = 'Hello from IPFS Gateway Checker'

const $results = document.querySelector('#results')
let ok = 0;

function addNode (gateway, online) {
	const para = document.createElement('li')
    let node
	if (online) {
        ok++;
		node = document.createElement('a')
        node.innerText = '✅ 线路'+ ok
        node.setAttribute("href",  gateway);
        node.setAttribute("target",  "_blank");
    }
    
    para.appendChild(node)
    console.log(para);
    
	$results.appendChild(para)
}

function checkGateways (gateways) {
    fetch('./offical.json')
    .then(res => res.json())
    .then(offical => {
        gateways.forEach((gateway) => {
            const gatewayAndHash = gateway.replace(':hash', hashToTest)
            // opt-out from gateway redirects done by browser extension
            const testUrl = gatewayAndHash + '#x-ipfs-companion-no-redirect'
            fetch(testUrl)
              .then(res => res.text())
              .then((text) => {
                const matched = text.trim() === hashString.trim()
                const officalAndHash = gateway.replace(':hash', offical.officalHash)
                addNode(officalAndHash, matched)
              }).catch((err) => {
                window.err = err
              })
          })
    })

}

fetch('./gateways.json')
  .then(res => res.json())
  .then(gateways => checkGateways(gateways))
