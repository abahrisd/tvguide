import HeaderBar from './headerBar'
import './styles/base.css';

const container = document.getElementById('container');

const header = new HeaderBar();

if (header.content){
    container.appendChild(header.content);
}


//container.innerText = 'Hello world!';