<script setup>
import { ref } from "vue";
import Alerta from "./components/Alerta.vue";
import Spinner from "./components/Spinner.vue";
import Cotizacion from './components/Cotizacion.vue';
import useCripto from "./composables/useCripto";

const {
  monedas,
  cotizar,
  criptomonedas,
  mostrarResultado,
  obtenerCotizacion,
  cargando,
  cotizacion,
} = useCripto();

const error = ref("");

const cotizarCripto = () => {
  if (Object.values(cotizar).includes("")) {
    error.value = "Todos los campos son Obligatorios";
    return;
  }
  error.value = "";
  obtenerCotizacion();
};
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <Alerta v-if="error">
        {{ error }}
      </Alerta>
      <form class="formulario" @submit.prevent="cotizarCripto">
        <div class="campo">
          <label for="moneda"> Moneda: </label>
          <select id="moneda" v-model="cotizar.moneda">
            <option value="">-- Selecciona --</option>
            <option :value="moneda.codigo" v-for="moneda in monedas">
              {{ moneda.texto }}
            </option>
          </select>
        </div>

        <div class="campo">
          <label for="cripto"> Criptomoneda: </label>
          <select id="cripto" v-model="cotizar.criptomoneda">
            <option value="">-- Selecciona --</option>
            <option
              :value="criptomenda.CoinInfo.Name"
              v-for="criptomenda in criptomonedas"
            >
              {{ criptomenda.CoinInfo.FullName }}
            </option>
          </select>
        </div>
        <input type="submit" value="Cotizar" />
      </form>
      <Spinner v-if="cargando" />
      <Cotizacion v-if="mostrarResultado" :cotizacion="cotizacion"/>
    </div>
  </div>
</template>
