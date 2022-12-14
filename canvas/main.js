let c=document.getElementById("my-canvas");
let ctx=c.getContext("2d");
let loadImage=(src,callback)=>{
let img = document.createElement("img");
img.onload = ()=> callback(img);
img.src = src;
};
let imagePath =(frameNumber, animation)=>{
    return "/" + animation + "/" + frameNumber + ".png";
};
let frames={
    idle:[1,2,3,4,5,6,7,8],
    kick:[1,2,3,4,5,6,7],
    punch:[1,2,3,4,5,6,7],
    backward :[1,2,3,4,5,6],
    block:[1,2,3,4,5,6,7,8,9],
    forward:[1,2,3,4,5,6]
};
let loadImages=(callback)=>{
    let images={idle:[],kick:[],punch:[],backward:[],block:[],forward:[]};
    let imagesToload = 0;
    ["idle","kick","punch","backward","block","forward"].forEach((animation)=>{
        let animationFrames= frames[animation];
        imagesToload=imagesToload+ animationFrames.length;
        animationFrames.forEach((frameNumber)=>{
        let path=imagePath(frameNumber,animation);
        loadImage(path,(image)=>{
            images[animation][frameNumber-1]=image;
            imagesToload=imagesToload-1;
            if(imagesToload===0)
            {
                callback(images);
            }
        });
        });
    });
};
let animate=(ctx,images,animation,callback)=>{
    images[animation].forEach((image,index)=>{
        setTimeout(()=>{
            ctx.clearRect(0,0,500,500);
            ctx.drawImage(image,0,0,500,500);
        },index*100);
    });
    setTimeout(callback,images[animation].length*100);
};
loadImages((images)=>{
    let queueAnimation=[];
    let aux = () => {
    let selectedAnimation;
    if(queueAnimation.length===0)
    {
        selectedAnimation="idle";
    }
    else{
        selectedAnimation=queueAnimation.shift();
    }
    
        animate(ctx,images,selectedAnimation,aux)
    };
    aux();
    document.getElementById("kick").onclick=()=>{
        queueAnimation.push("kick");
    };
    document.getElementById("punch").onclick=()=>{
        queueAnimation.push("punch");
    };
    document.getElementById("backward").onclick=()=>{
        queueAnimation.push("backward");
    };
    document.getElementById("block").onclick=()=>{
        queueAnimation.push("block");
    };
    document.getElementById("forward").onclick=()=>{
        queueAnimation.push("forward");
    };
    document.addEventListener("keyup",(event)=>{
        const key=event.key;
        if(key==="ArrowLeft"){
            queueAnimation.push("kick");
        }
        else if(key==="ArrowRight")
        {
            queueAnimation.push("punch");
        }
        else if(key==="ArrowUp")
        {
            queueAnimation.push("forward");
        }
        else if(key==="ArrowDown")
        {
            queueAnimation.push("backward");
        }
        else if(key==="Shift")
        {
            queueAnimation.push("block");
        }
    });
    });
