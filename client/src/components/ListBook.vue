<template>
    <b-col cols="4" style="margin-bottom:20px;">
        <b-card :title="book.judul"
                :img-src="book.image"
                :img-alt="book.judul"
                img-top>
            <ul class="card-text">
              <li>Penulis: {{book.penulis}}</li>
              <li>Penerbit: {{book.penerbit}}</li>
              <li>Reviews: {{book.reviews.length}}</li>
            </ul>
            <b-link :to="{ name: 'book', params: { id: book._id }}"><b-button variant="danger">Go Detail</b-button></b-link>
            <div slot="footer">
                <small class="text-muted">uploaded by {{book.userId.name}}</small>
            </div>
        </b-card>
    </b-col>
</template>

<script>
export default {
  props: ['book']
}
</script>

<style>

</style>
