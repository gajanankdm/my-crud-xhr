let cl = console.log;
let card = document.getElementById('card')
let postformcontrol = document.getElementById('postform');

let titlecontrol = document.getElementById('title');
let bodycontrol = document.getElementById('body');
let useridcontrol = document.getElementById('userid');
cl(useridcontrol)
let updatecontrol = document.getElementById('update');
let addbtn = document.getElementById('addbtn');





let baseurl = `https://jsonplaceholder.typicode.com`



let posturl = `${baseurl}/posts`
cl(posturl)


let postarry = [];
const onhandler = (eve) => {
    eve.preventDefault();
    let newpost = {
        title: titlecontrol.value,
        body: bodycontrol.value,
        userid: useridcontrol.value
    }
    cl(newpost);
    createobj(newpost);


}
const tempaltingREFacter = (ele) => {
    let card2 = document.createElement('div');
    card2.className = 'card mb-4'
    card2.id = ele.id;
    card2.innerHTML = `  <div class="card-header">
    <h1>
           ${ele.title}
  </h1>
         </div>
                    <div class="card-body">
                       <p>
                         ${ele.body}
                     </div>
<div class="card-footer  d-flex justify-content-between">
<button class="btn btn-primary" onclick="clickhandler(this)"> edit</button>
<button class="btn btn-danger"onclick="deletehandler(this)"> delete</button>
</div>
    `
    card.append(card2);
    cl(card2);
}
const createobj = (postobj) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', posturl, true);

    xhr.send(JSON.stringify(postobj));
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            postobj.id = JSON.parse(xhr.response).id;
            postarry.push(postobj);
            tempaltingREFacter(postobj) 
            Swal.fire({
                title: "Good job!",
                text: "You  have created post",
                icon: "success"
            });


        }
        postformcontrol.reset()


    }
}

const clickhandler = (eve) => {
    let getid = eve.closest('.card').id; 
    localStorage.setItem('get', getid)
    cl(getid);
    let getobjurl = `${baseurl}/posts/${getid}`;
    cl(getobjurl)
    let xhr = new XMLHttpRequest;
    xhr.open("GET", getobjurl, true);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status === 200) { 
            cl(xhr.response)

            let getobj = JSON.parse(xhr.response);
            cl(getobj)
            titlecontrol.value = getobj.title
            bodycontrol.value = getobj.body
            useridcontrol.value = getobj.userId

            addbtn.classList.add('d-none')
            updatecontrol.classList.remove('d-none')
        }
    }
    postformcontrol.reset()

}

const postupdate = (ele) => {
    let updateobj = {
        title: titlecontrol.value,
        body: bodycontrol.value,
        useridcontrol: useridcontrol.value
    }
    cl(updateobj)
    let getupdateid = localStorage.getItem('get')
    cl(getupdateid)
    let updateurl = `${posturl}/${getupdateid}`
    cl(updateurl)

    let xhr = new XMLHttpRequest();
    xhr.open('PATCH', updateurl, true)
    xhr.send(JSON.stringify(updateobj))
    xhr.onload = function () {
        if (xhr.status === 200) {
            let getid2 = postarry.findIndex(post => {

                return post.id == getupdateid
            })
            cl(getid2)
            postarry[getid2].title = updateobj.title;
            postarry[getid2].body = updateobj.body;
            postarry[getid2].userid = updateobj.userid;

            tempalting(postarry);
            Swal.fire({
                title: "POST UPDATED",
                text: "things in post are updated",
                icon: "success"
            });
        }
    }
    postformcontrol.reset()


}
const deletehandler = (ele) => { 
    cl(ele)
    let deleteobj = ele.closest('.card').id;
    cl(deleteobj)
    let deleteurl = `${posturl}/${deleteobj}`
    cl(deleteurl)
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', deleteurl, true);
    xhr.send();
    xhr.onload = function () {
        cl(xhr.response)
        if (xhr.status === 200) { 
            let delete2 = document.getElementById(deleteobj);
            cl(delete2);
            delete2.remove();
            Swal.fire({
                title: "POST DELETED",
                text: "things in post are deleted",
                icon: "success"
            });
        }



    }



}


let tempalting = (arr => {
    let result = ``;
    arr.forEach(ele => {
        result += `  <div class="
        "id="${ele.id}">
                                  <div class="card-header">
                           <h1>
                                  ${ele.title}
                         </h1>
                                </div>
                                           <div class="card-body">
                                              <p>
                                                ${ele.body}
                                            </div>
        <div class="card-footer  d-flex justify-content-between">
            <button class="btn btn-primary" onclick="clickhandler(this)"> edit</button>
            <button class="btn btn-danger"onclick="deletehandler(this)"> delete</button>
        </div>
    </div>`
    });
    card.innerHTML = result;
})

const gethandler = () => {
    let xhr2 = new XMLHttpRequest();


    xhr2.open('GET', posturl); 


    xhr2.send()
    xhr2.onload = function gt() {
        cl(xhr2.response)

        if (xhr2.status === 200) { 
            postarry = JSON.parse(xhr2.response)
            
            tempalting(postarry)
        } else {
            alert("something went wrong")
        }

    }


}
gethandler()

postformcontrol.addEventListener('submit', onhandler)
updatecontrol.addEventListener('click', postupdate)















