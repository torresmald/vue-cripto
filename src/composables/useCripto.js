import { ref, reactive, onMounted, computed } from 'vue';

export default function useCript() {
    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', texto: 'Peso Mexicano' },
        { codigo: 'EUR', texto: 'Euro' },
        { codigo: 'GBP', texto: 'Libra Esterlina' },
    ]);
    const cotizar = reactive({
        moneda: '',
        criptomoneda: ''
    });
    const criptomonedas = ref([]);
    const cotizacion = ref({});
    const cargando = ref(false);

    const obtenerCotizacion = async () => {
        cargando.value = true
        const { moneda, criptomoneda } = cotizar
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        setTimeout(() => {
            cotizacion.value = data.DISPLAY[criptomoneda][moneda];
            cargando.value = false
        }, 2000);

    };
    onMounted(async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';
        fetch(url);
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        const { Data } = resultado
        criptomonedas.value = Data;
    });
    const mostrarResultado = computed(() => {
        return Object.values(cotizacion.value).length > 0
    });
    return {
        monedas,
        cotizar,
        criptomonedas,
        mostrarResultado,
        obtenerCotizacion,
        cargando,
        cotizacion
    }
}