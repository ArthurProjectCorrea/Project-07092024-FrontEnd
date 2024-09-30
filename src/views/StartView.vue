<template>
  <div class="home-page">
    <!-- Banner Principal como Carrossel -->
    <swiper
      :slides-per-view="1"
      :loop="true"
      pagination
      navigation
      class="news-slider"
    >
      <swiper-slide v-for="(news, index) in featuredNews" :key="index">
        <div class="slide-content">
          <img :src="news.image" alt="News image" />
          <div class="slide-text">
            <h2>{{ news.title }}</h2>
            <p>{{ news.summary }}</p>
            <router-link :to="`/news/${news.id}`" class="read-more">Leia mais</router-link>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <!-- Lista de Últimas Notícias -->
    <div class="recent-news">
      <h3>Últimas Notícias</h3>
      <div v-for="news in paginatedNews" :key="news.id" class="news-item">
        <img :src="news.image" alt="News image" />
        <div class="news-content">
          <h3>{{ news.title }}</h3>
          <p>{{ news.summary }}</p>
          <router-link :to="`/news/${news.id}`">Leia mais</router-link>
        </div>
      </div>
      <PaginationCustom
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-changed="changePage"
      />
    </div>

    <!-- Seção de Categorias -->
    <div class="category-section">
      <h3>Categorias Populares</h3>
      <div v-for="category in categories" :key="category.id" class="category-item">
        <img :src="category.image" alt="Category image" />
        <h4>{{ category.name }}</h4>
        <p>{{ category.articleCount }} artigos recentes</p>
        <router-link :to="`/category/${category.slug}`">Ver mais</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import PaginationCustom from '@/components/PaginationCustom.vue';

// Dados fictícios
const featuredNews = ref([
  { id: 1, title: "Notícia 1", summary: "Resumo da notícia 1...", image: "/image/imagem.jpg" },
  { id: 2, title: "Notícia 2", summary: "Resumo da notícia 2...", image: "/image/imagem.jpg" },
  { id: 3, title: "Notícia 3", summary: "Resumo da notícia 3...", image: "/image/imagem.jpg" },
  { id: 4, title: "Notícia 4", summary: "Resumo da notícia 4...", image: "/image/imagem.jpg" },
  { id: 5, title: "Notícia 5", summary: "Resumo da notícia 5...", image: "/image/imagem.jpg" },
  { id: 6, title: "Notícia 6", summary: "Resumo da notícia 6...", image: "/image/imagem.jpg" },
  { id: 7, title: "Notícia 6", summary: "Resumo da notícia 6...", image: "/image/imagem.jpg" },
  { id: 8, title: "Notícia 6", summary: "Resumo da notícia 6...", image: "/image/imagem.jpg" },
]);

const recentNews = ref([
  { id: 2, title: "Notícia Recente 2", summary: "Resumo...", image: "/image/imagem.jpg" },
  { id: 3, title: "Notícia Recente 3", summary: "Resumo...", image: "/image/imagem.jpg" },
  { id: 4, title: "Notícia Recente 4", summary: "Resumo...", image: "/image/imagem.jpg" },
  { id: 5, title: "Notícia Recente 5", summary: "Resumo...", image: "/image/imagem.jpg" },
  { id: 1, title: "Notícia Recente 1", summary: "Resumo...", image: "/image/imagem.jpg" },
  { id: 6, title: "Notícia Recente 6", summary: "Resumo...", image: "/image/imagem.jpg" },
  { id: 7, title: "Notícia Recente 6", summary: "Resumo...", image: "/image/imagem.jpg" },
  { id: 8, title: "Notícia Recente 6", summary: "Resumo...", image: "/image/imagem.jpg" },
]);

const categories = ref([
  { id: 1, name: "Política", articleCount: 5, slug: "politica", image: "/image/imagem.jpg" },
  { id: 2, name: "Tecnologia", articleCount: 8, slug: "tecnologia", image: "/image/imagem.jpg" },
]);

// Paginação
const itemsPerPage = 5;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(recentNews.value.length / itemsPerPage));
const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return recentNews.value.slice(start, start + itemsPerPage);
});

function changePage(page) {
  currentPage.value = page;
}
</script>

<style scoped>
.home-page {
  padding: 20px;
}
.news-slider {
  margin-bottom: 30px;
}
.slide-content {
  display: flex;
  align-items: center;
}
.slide-text {
  margin-left: 15px;
}
.news-item, .category-item {
  display: flex;
  margin-bottom: 15px;
}
.news-content {
  margin-left: 10px;
}
.read-more {
  color: blue; /* Personalize o estilo do link */
}
</style>
