<template>
    <nav class="navbar bg-white">
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <a class="navbar-brand" href="#">
              <img src="images/smug.png" id="logo" />
            </a>
          </div>
          <div class="col-6">
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="TEMP NAVBAR PLACEHOLDER"
                aria-label="Search"
                style="width: 686px !important"
              />

            </form>
          </div>
        </div>
      </div>
    </nav>

    <div id="photo" class="container">
      <img
        src="https://randomuser.me/api/portraits/women/81.jpg"
        alt=""
        class="rounded-circle mx-auto d-block"
      />
    </div>

    <div id="userid" class="container text-center position-relative">
      <h1>KrazyWoman1</h1>
    </div>

    <div id="rating" class="container text-center">2.5 
          <font-awesome-icon icon="fa-solid fa-star" class="fa-star"/>
          | 89 ratings
      </div>


      <div>
        <table class="desc">
          <tr>
            <th>Name</th>
            <td>Chester Chia</td>
          </tr>
          <tr>
            <th>Degree</th>
            <td>Bachelor of Science</td>
          </tr>
          <tr>
            <th>Major</th>
            <td>Information Systems</td>
          </tr>
          <tr>
            <th>Year of Study</th>
            <td>2</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>chester@gods.com</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit enim fugit reprehenderit neque, tenetur totam libero maiores et atque placeat minus ex ducimus, sit nisi a sint mollitia laborum optio?</td>
          </tr>
        </table>
      </div>

      <div class="container" style="margin-top: 50px">
        <div class="row justify-content-around">
          <div class="col">
            <div class="card" style="width: 18rem;">
              <img src="" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card" style="width: 18rem;">
              <img src="" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card" style="width: 18rem;">
              <img src="" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>

      </div>
</template>

<style>
* {
    margin:0;
    padding:0;
}

#photo {
    margin-top: 20px;
}
#userid {
    margin-top: 20px;
}

#logo {
    width: 166px;
    height: 38px;
    margin-left: 20px
}

.desc {
    margin-top: 20px;
    margin-left: 340px;
    margin-right: 240px;
    
    
    

}
th {
    white-space: nowrap;
    vertical-align: top;
    text-align: right;
}
td {
    text-align: left;
    padding-left: 10px;
    width: fixed;
}</style>