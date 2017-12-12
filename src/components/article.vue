<template>
  <div>
    <section class='container'>
      <section class='col-xs-10 col-xs-offset-1'>
        <section class='jumbotron item'>
          <h3>{{article.title}}</h3>
          <span class='pull-right' style='color:gray'>{{article.date}}</span>
          <article style='clear:both'>
            {{article.text}}
          </article>
        </section>
      </section>
    </section>
  </div>  
</template>
<script>
export default {
  props:['article']
}
</script>

<style>
.item{
  background-color: #222222;
  box-shadow:4px 4px 4px rgba(2,2,2,0.2);

}
article{
  font-size:20px;
  line-height: 1.414em;
  text-indent: 40px;
  word-wrap:break-word;
  word-break: break-all;
}
</style>
