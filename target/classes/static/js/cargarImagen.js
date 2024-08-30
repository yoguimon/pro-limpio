const defaultFile='https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-character-default-avatar-image_2237203.jpg';

const file = document.getElementById('foto');
const img = document.getElementById('img');
file.addEventListener('change',e=>{
    if(e.target.files[0]){
        const reader = new FileReader();
        reader.onload=function(e){
            img.src =e.target.result;
        }
         reader.readAsDataURL(e.target.files[0]);
    }else{
        img.src=defaultFile;
    }
});