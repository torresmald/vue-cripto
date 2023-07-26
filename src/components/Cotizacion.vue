<script setup>
    defineProps(['cotizacion']);
</script>
<template>
    <div class="contenedor-resultado">
        <h2>Cotizacion</h2>
        <div class="resultado">
          <img
            :src="'https://cryptocompare.com/' + cotizacion.IMAGEURL"
            alt="Imagen Cripto"
          />
          <div>
            <p>
              El precio es de: <span>{{ cotizacion.PRICE }}</span>
            </p>
            <p>
              Precio más alto del Dia: <span>{{ cotizacion.HIGHDAY }}</span>
            </p>
            <p>
              Precio más bajo del Día: <span>{{ cotizacion.LOWDAY }}</span>
            </p>
            <p>
              Variacion Ultimas 24horas:
              <span>{{ cotizacion.CHANGEPCT24HOUR }}%</span>
            </p>
            <p>
              Última Actualización: <span>{{ cotizacion.LASTUPDATE }}</span>
            </p>
          </div>
        </div>
      </div>
</template>