// ********** FECHA ************ // 
const fecha = document.getElementById("fecha");
fecha.innerHTML = new Date().getFullYear();


// ********** NAV TOGGLE ************ //
const navToggle = document.querySelector(".nav-toggle");
const linksContenedor = document.querySelector(".links-contenedor");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  const alturaLinks = links.getBoundingClientRect().height;
  const alturaContenedor = linksContenedor.getBoundingClientRect().height;
  if (alturaContenedor === 0) {
    linksContenedor.style.height = `${alturaLinks}px`;
  } else {
    linksContenedor.style.height = 0;
  }  
});

// ********** FIXED NAV ************ //

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const alturaScroll = window.pageYOffset;
  const alturaNav = navbar.getBoundingClientRect().height;
  if (alturaScroll > alturaNav) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  if (alturaScroll > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// ********** SCROLL ************ // 

const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (evt) => {
    evt.preventDefault();    
    const id = evt.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContenedor.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;
    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }
    window.scrollTo({
      left: 0,
      top: position,
    });    
    linksContenedor.style.height = 0;
  });
});


/* DESTINOS */

const img = document.getElementById("destino-img");
const lugar = document.getElementById("lugar");
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const destinos = [];

window.addEventListener("DOMContentLoaded", function(){    
    fetch("./data/data.json")
    .then((res)=>{
      return res.json();
    })
    .then((lugares)=>{
      lugares.forEach(lugar => {
        destinos.push(lugar)
      })
      mostrarDestino(lugares);
      cargarSimulador(lugares); 
    })
    .catch((err)=> console.log(err))    
});

let currentItem = 0;

function mostrarDestino(){   
    const item = destinos[currentItem];
    img.setAttribute('src', item.imagen)
    lugar.textContent = item.lugar + " / " + item.pais;
    descripcion.textContent = item.descripcion;
    precio.textContent = "desde U$ " + item.precio + " Dolares p/Persona"
}

nextBtn.addEventListener('click', function(){
    currentItem++;
    if(currentItem > destinos.length - 1){
        currentItem = 0;
    }
    mostrarDestino();
})

prevBtn.addEventListener('click', function(){
    currentItem--;
    if(currentItem < 0){
        currentItem = destinos.length - 1;
    }
    mostrarDestino();
})

const botonSim = document.querySelector('#simular');

botonSim.addEventListener('click', ()=>{ 
  select.options.item(currentItem+1).setAttribute('selected', "selected");  
  dolares.setAttribute('value', destinos[currentItem].precio)
})



/* CAMBIAR DE COLOR EL FONDO*/

const coloresClaros = ["#FFD899", "#7EBDC2", "#C8E0F4", "#E6C229", "#D8E1FF", "#ACBFA4", "#4BB3FD", "#ABDAE1", "#F1F5F8"]
const btnColor = document.getElementById("btn");
const contacto = document.querySelector(".focus");

function numeroAleatorio(){
    return Math.floor(Math.random() * coloresClaros.length);
}

btnColor.addEventListener('click', function(){           
    contacto.style.backgroundColor = coloresClaros[numeroAleatorio()];
    btnColor.setAttribute("title", coloresClaros[numeroAleatorio()]);        
})

/* CONTACTO */ 
const input = document.querySelectorAll(".inputs");
const body = document.querySelector("body");
const enviar = document.querySelector('#enviar');

for(let i=0; i<input.length; i+=1){
  input[i].addEventListener("focus", function () {  
    contacto.classList.add("contactoGrande");
  });
  input[i].addEventListener("blur", function () {  
    contacto.classList.remove("contactoGrande");
  });
}

enviar.addEventListener('click', ()=>{  
  input.forEach(inputs => {
    if(inputs.value == ""){
      Swal.fire({        
        position: 'top-end',
        icon: 'error',
        title: 'Error',
        text: 'Uno o más campos se encuentran vacios!',            
      })
    }
  } )  
})

contacto.addEventListener('submit', (evt)=>{
  evt.preventDefault(); 
  Swal.fire({        
    position: 'center',
    imageUrl: 'https://media0.giphy.com/media/5XCWLH6ovlsiISpU2U/giphy.gif',    
    title: 'Formulario enviado \n con exito!',              
  })     
})


/* SIMULADOR DE COSTOS */ 

const select = document.querySelector('#select');

function cargarSimulador(destinos){
  let i = 1;
  let html = '<option class="form-control form-select hola" name="destino" required value="0">Seleccione un destino...</option>';
  destinos.forEach((destino) => {
    html += `<option class="option" name="destino" required value="${i++}">${destino.lugar}</option>`
  });  
  select.innerHTML = html;
}

const inputTotal = document.querySelector('#total');
const inputPasajeros = document.querySelector('#pasajeros');
const valija = document.querySelector('#valija');
const noches = document.querySelector('#noches');
const btnCalcular = document.querySelector('#calcular');
const dolares = document.querySelector('#dolares');

btnCalcular.addEventListener('click', (evt)=>{  
  if(select.options[select.selectedIndex].value == 0) {
    evt.preventDefault();
    Swal.fire({        
      position: 'center',
      icon: 'error',
      title: 'Error',
      text: 'Debes seleccionar un destino!',            
    })
    return
  }  
  let total = 0.00;
  let precioDestino;
  destinos.forEach((destino) => {
    if(select.options[select.selectedIndex].text == destino.lugar){
      precioDestino = destino.precio;  
    } 
  })  
  let pasajeros = parseInt(inputPasajeros.value)
  let noche = parseInt(noches.value) 
  let cambio = cotizacionDolar.value;
  cambio = cambio.replace(/,/g, '.')
  total = (precioDestino * pasajeros * noche)  
  if(valija.options[valija.selectedIndex].value == "1"){
      total += pasajeros * 100;  
  }
  totalPesos = total * cambio;    
  inputTotal.setAttribute('value', totalPesos);
  dolares.setAttribute('value', total);
})

inputPasajeros.addEventListener('change', ()=>{
  console.log(inputPasajeros.value)
})





/* COTIZACION DOLAR MEDIANTE API*/ 

const cotizacionDolar = document.querySelector('#cotizacion') 
const casasDeCambio = []

window.addEventListener("DOMContentLoaded", function(){
  fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
  .then((res) =>{
    return res.json();
  })
  .then((cotizacion) =>{  
    cotizacion.forEach((casas) =>{
      casasDeCambio.push[casas];
    })
    cotizacionDolar.setAttribute('value', cotizacion[0].casa.compra)      
  })
  .catch((err)=> console.log(err))
})
