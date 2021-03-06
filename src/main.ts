import './style.css';// importa archivos de estilos para dar tamaño al mapa
import { Map, View } from 'ol';//librerias para crear mapa y view para ubicarse dentro del mapa
import XYZ from 'ol/source/XYZ';//xyz representan la posición de mapa a mostrar descargando las baldosas que componen la imagen del mapa
import { fromLonLat } from 'ol/proj';//permite utilizar longitud y latitud
import { FullScreen, ZoomSlider, ScaleLine, OverviewMap } from 'ol/control';//Importa codigo para la barra de zoom y importar còdigo de Escala de linea para tener una linea de escala ;)// se importa el código de overviewmap para crear un mini mapa general 
import proj4 from 'proj4'; //proj4 lo necesita la linea de escala del mapa
import { register } from 'ol/proj/proj4';//proj4 lo necesita la linea de escala del mapa
import OSM from 'ol/source/OSM';
import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import jquery from "jquery";
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'; //Libreria para incluir capas de servidor de mapas y archivos kml
import VectorSource from 'ol/source/Vector';
import KML from 'ol/format/KML';


const $: JQueryStatic = jquery;
const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(12),
    projection: 'EPSG:4326',
    // comment the following two lines to have the mouse position
    // be placed within the map.
    //className: 'custom-mouse-position',
    //target: document.getElementById('mouse-position'),
});
proj4.defs('Indiana-East', 'PROJCS["IN83-EF",GEOGCS["LL83",DATUM["NAD83",' + 'SPHEROID["GRS1980",6378137.000,298.25722210]],PRIMEM["Greenwich",0],' + 'UNIT["Degree",0.017453292519943295]],PROJECTION["Transverse_Mercator"],' + 'PARAMETER["false_easting",328083.333],' + 'PARAMETER["false_northing",820208.333],' + 'PARAMETER["scale_factor",0.999966666667],' + 'PARAMETER["central_meridian",-85.66666666666670],' + 'PARAMETER["latitude_of_origin",37.50000000000000],' + 'UNIT["Foot_US",0.30480060960122]]');
register(proj4);
const div: string = 'map';//Etiquta html donde se renderiza el mapa
const view: View = new View({
    maxZoom: 19,
    minZoom: 6,
    center: fromLonLat([-74.0942881, 4.6451452]),
    zoom: 4
});//Ubicación con cordenadas

const keymaptiler: string = "KI6pOBMRE16JRueFffi7"//clave para utilizar el servicio gratis de mapa satelital de baja resolución
const layerOSM = new OSM();
const layerOpenStreetMap = new TileLayer({ source: new XYZ({ url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png' }) });//capa o imagenes de mapas de servidor gratuito de mapas para ver mapas de calles
const layerRasterArcGIS = new TileLayer({ source: new XYZ({ url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', }) });//capa o imagenes de mapa de servidor de la empresa esri con su producto arcgis para ver mapas tipo topologicos
const map: Map = new Map({ layers: [layerOpenStreetMap] });//Creación del objeto mapa para agregarle imagenes o posición al mismo
const layerMapTiler = new TileLayer({ className: 'ol-layer-imagery', source: new XYZ({ url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + keymaptiler, crossOrigin: '', }) });//capa o imagenes de mapa de servidor de maptiler para ver imagenes satelitales
const layerDpto = new VectorLayer({ source: new VectorSource({ url: 'mapas/colombia/MGN_DPTO_POLITICO.kml', format: new KML(), }), });
const zoomslider = new ZoomSlider({ duration: 3000, });//Crea en memoria ram el codigo para estar listo a ser llamado a la interfaz grafica y mostrar una barra deslizante de ampliaciòn del mapa
const fullScreen = new FullScreen();//Instancia el objeto de botón para pantalla completa para después mostrarlo
const overviewMapControl = new OverviewMap({ layers: [new TileLayer({ source: layerOSM, }),], collapsed: false });// agrega el mini mapa con la capa prevista
const disclaimer: string = ".disclaimer";/** variable que almacena el identificador de clase del elemento div que contiene publicidad */
map.setTarget(div);//Presentar en la web el mapa mediante la etiqueta html incluida en la variable de texto div
map.setView(view);//establecer la posición inicial del mapa de acuerdo a la constante view
map.addControl(zoomslider);//se agrega control del zoom deslizante
map.addControl(fullScreen);//muestra el control de pantalla completa
map.addControl(overviewMapControl);//muestra el control de pantalla completa
map.addControl(mousePositionControl);//Agrega la posición Del Mouse
//map.addLayer(layerOpenStreetMap);//agrega la imagen de capa de acuerdo a lo que se almaceno en el mapa
//map.addLayer(layerRasterArcGIS);//agrega la imagen de capa de acuerdo a lo que se almaceno en el mapa
var mapNumberLayer = 1;//Variable contadora para mostrar capa de acuerdo a su número
//Metodo que cambia el mapa
map.addLayer(layerDpto);
function setMapLayer() {
    // condicional para poner el mapa OpenStreetMap
    if (mapNumberLayer == 1) {
        try {//intenta agregar la capa y si ya existe controla el error por ya existir
            map.addLayer(layerOpenStreetMap);//agrega la capa de calles
        } catch { }
        map.removeLayer(layerRasterArcGIS);//remueve capa
        map.removeLayer(layerMapTiler);//remueve capa
        mapNumberLayer = 2;
    }
    // condicional para poner el mapa ArcGIS
    else if (mapNumberLayer == 2) {
        map.addLayer(layerRasterArcGIS);//agrega la capa de topologia
        map.removeLayer(layerOpenStreetMap);//remueve capa
        map.removeLayer(layerMapTiler);//remueve capa
        mapNumberLayer = 3;
    }
    // condicional para poner el mapa Tiler
    else if (mapNumberLayer == 3) {
        map.addLayer(layerMapTiler);//agrega la capa satelital
        map.removeLayer(layerRasterArcGIS);//remueve capa
        map.removeLayer(layerOpenStreetMap);//remueve capa
        mapNumberLayer = 1;
    }
}
//setInterval(setMapLayer, 4000);//establecimiento de intervalo para ejecutar cada cierto tiempo el metodo de cambio de capa
class Adblock {
    identifier: string;
    /**
     * 
     * @param identifier ingrese el class o id a eliminar
     * @example let objAdBlock = new Adblock(".disclaimer");
     */
    constructor(identifier: string) {
        this.identifier = identifier;
    }
    remove() {
        $(this.identifier).remove();
        setInterval(() => {
            $(this.identifier).remove();
        }, 500);
    }
}
var objAdBlock = new Adblock(disclaimer);
objAdBlock.remove();