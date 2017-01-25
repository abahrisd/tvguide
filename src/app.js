import HeaderBar from './headerBar'
import './styles/base.css';
import CenterBlock from './centerBlock'

const container = document.getElementById('container');
const header = new HeaderBar();
const centerBlock = new CenterBlock();

if (header.content){
    container.appendChild(header.content);
}
if (centerBlock.content){
    container.appendChild(centerBlock.content);
}


//container.innerText = 'Hello world!';