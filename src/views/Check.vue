<template>
  <div class="CheckContent">
    <div class="courseHtml" v-html="ResHTML"></div>
    <div class="courseCheck">
      <div v-for="course in courseArr">
        <input type="checkbox" name="" id="">
        {{course.name}}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      ResHTML: '',
      courseArr: []
    }
  },
  async mounted() {
    const getData = await axios.get('http://127.0.0.1:7001/login');
    console.log(getData.data);
    this.ResHTML = getData.data.html;
    this.courseArr = getData.data.newCourseArr;
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.CheckContent {
  display: flex;
  height: 100vh;
  width: 100vw;
}
.courseHtml {
  flex-basis: 50%;
  height: 100%;
}
.courseCheck {
  flex: 1;
}
</style>
