const content = document.querySelector('article');
const panels = document.querySelectorAll('.panel');
const addBlogBtn = document.querySelector('.add');
const addBlogForm = document.querySelector('form');
const blogList = document.querySelector('.blog-list');
const submit = document.querySelector('.submit');
// const unsubBtn = document.querySelector('.unsub');

addBlogBtn.addEventListener('click', function () {
    let formContainer = document.querySelector('.form-wrapper');
    formContainer.classList.toggle('hidden');

    if(!formContainer.classList.contains('hidden')) {
        addBlogBtn.innerText = 'remove';
    } else {
        addBlogBtn.innerText = 'add';
    }

})

// Form validation

validateTitle = () => {
    const error = document.querySelector('.error-title');
    let regex =/^.{1,40}$/;
    let title = addBlogForm.title.value;
    
    if(title.match(regex)) {
        addBlogForm.title.style.outline = '1px solid green';
        error.textContent = '';
        return true;
    } 

    if(!title.match(regex)) {
        addBlogForm.title.style.outline = '1px solid red';
        error.textContent = 'Title is required';
        return false;
    }
}
   

validateAuthor = () => {
    let regex = /^(\w+ )+\w+$/;
    const error = document.querySelector('.error-author');
    let author = addBlogForm.author.value;

	if(author.length == 0) {
		error.innerHTML = '<p>This field cannot be empty</p>';
		return false;
	}

	if(!author.match(regex)){
		error.innerHTML = '<p>fullname is required</p>';
		return false;
	}

    error.innerHTML = '';
    addBlogForm.author.style.border = '1px solid green';
	return true;
}
	


validateContent = () => { 
    let regex = /^.{1,1000}$/;
    const error = document.querySelector('.error-content');
    let content = addBlogForm.content.value;

    if(content.length == 0) {
		error.textContent = 'content cannot be empty';
		return false;
	}

    error.textContent = '';
    addBlogForm.content.style.border = '1px solid green';
	return true;
}

// Updating the UI
const addBlog = (recipes) => {
    let time = recipes.data().created_at.toDate();
    let html = `
                        <li class = "panel mt-3" data-id ="${recipes.id}">
                        <p class="title bg-blue-600 text-white p-3 flex justify-between">${recipes.data().title}<span class="chevron material-symbols-outlined  bg-black m-1 rounded-full" title="Read-more">
                            expand_more
                            </span></p>
                        
                        <article class = "article my-4">
                            <div class="author bg-green-500 p-3 text-white">Written by:  ${recipes.data().author}</div>
                            <div class="date bg-primary pl-3 text-white">${time}</div>
                            <div>
                                <p class="content bg-blue-600 p-3 text-white">${recipes.data().content}</p>
                            </div>
                            <button class="btn border border-gray-500 rounded-lg mt-3 del-btn">delete</button>
                        </article>
                        

                    </li>
                    `
   blogList.innerHTML += html;
}

// Getting Collections
db.collection("recipes").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const recipes = doc;
        addBlog(recipes);
    });

    // Quering the elements for each blog Item

        let lists = Array.from(blogList.children);
        let chevron = document.querySelectorAll('.chevron');
        let article = document.querySelectorAll('.article');


        for(let i = 0; i < lists.length; i++){

            panels[i].addEventListener('click', () => {
                chevron[i].classList.toggle('chevron-up');
                chevron[i].classList.toggle('chevron-down');

                if(chevron[i].classList.contains('chevron-up')){
                    article[i].style.display = 'block';
                } else {
                    article[i].style.display = 'none';
                }
            });

            // Deleting each blog item
            const delBtn = document.querySelectorAll('.del-btn');

            delBtn[i].addEventListener('click', (e) => {


                const id = delBtn[i].parentElement.parentElement.getAttribute('data-id');
                console.log(id);
                // Deleting Data
                db.collection("recipes").doc(id).delete().then(() => {
                    document.location.reload(true);
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });

                
            });
        }

}); 
            
submit.addEventListener('click', (e) => {
    e.preventDefault();
    const error = document.querySelector('.error-form');
    const now = new Date();

    if(!validateTitle() || !validateAuthor() || !validateContent()) {
            error.textContent = 'Form is not valid';
    } else {
        error.textContent = '';
        const inputData = {
                author: addBlogForm.author.value,
                content: addBlogForm.content.value,
                created_at: firebase.firestore.Timestamp.fromDate(now),
                title: addBlogForm.title.value
            }

        // Adding data
        db.collection("recipes").add(inputData)
        .then((docRef) => {
        addBlogForm.reset();
        document.location.reload(true);
        })
        .catch((error) => {
        console.error("Error adding document: ", error);
        });
    }

});
