
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

function populateCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const uf_Id = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = '<option value="">Selecione a Cidade</option>'
    citySelect.disabled = true

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf_Id}/municipios`)
        .then(res => res.json())
        .then(cities => {
            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false


        })
}
populateUFs();

document.querySelector("select[name=uf]")
    .addEventListener("change", populateCities)

// Itens de coleta
const itensToCollect = document.querySelectorAll(".itens-grid li")

for (let item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}
const collectedItens = document.querySelector("input[name=itens]")
let selectedItens = []

function handleSelectedItem(event) {
    const itemLi = event.target
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    const alredySelected = selectedItens.findIndex(function (item) {
        return item == itemId
    })

    if (alredySelected >= 0) {
        const filteredItens = selectedItens.filter(item => item != itemId)
        selectedItens = filteredItens
    } else {
        selectedItens.push(itemId)
    }
    collectedItens.value = selectedItens
}




