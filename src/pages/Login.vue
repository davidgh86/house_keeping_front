<template>
  <div class="wrapper">
    <div class="header">CITY BREAK APARTMENTS</div>
    <div class="subheading">HSK Admin</div>
    <div class="loginbox">
      <div class="user">USER</div>
      <input type="text" class="userinput" v-model="user"/>
      <div class="password">PASSWORD</div>
      <input type="password" class="passwordinput"  v-model="password"/>
      <div class="passwordrecovery">Forgot your password?</div>
    </div>
    <button type="button" class="enter" @click="enter()">ENTER</button>
    <img
      src="https://www.citybreakapartments.com/wp-content/uploads/2017/10/CityBreakApartments2.png"
      alt="City Break Logo"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Login",
  data: function(){
    return {
      user: "",
      password: ""
    }
  },
  methods: {
    enter: function () {
      axios.post(process.env.API_REST_URL+'/user/login', {
          username: this.user,
          password: this.password
      })
      .then((response) => {
        console.log(response)
        alert(JSON.stringify(response.data))
        //this.$router.push("/");
      }, (error) => {
        alert(error)
      })
    },
  },
});
</script>

<style scoped>
.header {
  grid-row: 1;
  background-image: linear-gradient(to right, #009eda, #025389);
  color: white;
  font-family: "Open Sans";
  font-style: normal;
  font-size: 4.7rem;
  text-align: center;
  padding: 0.95rem;
}
.subheading {
  grid-column: 1;
  grid-row: 2;
  font-family: "Open Sans";
  font-style: normal;
  font-size: 5rem;
  text-align: center;
  margin-top: 12.5rem;
  margin-bottom: 12.5rem;
}
div.loginbox {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-auto-rows: minmax(6.25rem, auto);
  text-align: center;
  border-top: 6.25rem;
  font-family: "Open Sans";
  font-weight: 300;
  background-color: #d9d9d9;
}
.user {
  grid-column: 2;
  grid-row: 1;
  font-size: 3.75rem;
  margin-top: 1.25rem;
}
.userinput {
  grid-column: 2;
  grid-row: 2;
  background-color: white;
  border-radius: 1.55rem;
  text-align: center;
  font-size: 3.12rem;
  border: none;
}
.password {
  grid-column: 2;
  grid-row: 3;
  font-size: 3.75rem;
  margin-top: 6.25rem;
  margin-bottom: 0.62rem;
}
.passwordinput {
  grid-column: 2;
  grid-row: 4;
  background-color: white;
  border-radius: 1.55rem;
  text-align: center;
  font-size: 3.12rem;
  border: none;
}
.passwordrecovery {
  grid-column: 2;
  grid-row: 6;
  font-size: 0.95rem;
  text-decoration: underline;
}
.enter {
  margin-top: 6.25rem;
  margin-bottom: 6.25rem;
  border-radius: 1.55rem;
  display: block;
  height: 6.25rem;
  width: 25rem;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  font-family: "Open Sans";
  font-size: 4.37rem;
  font-weight: 600;
  background-color: #025389;
  color: white;
}
img {
  margin-top: 2.5rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
