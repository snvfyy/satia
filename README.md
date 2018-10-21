# SATIA

SATIA o Sistema de Alerta Temprana para Incidencias Ambientales, es una
aplicación que permite a los usuarios conocer los riesgos
naturales que estan poniendoles en peligro, y al mismo tiempo les
provee de una serie de recomendaciones y pautas que deben adoptar para
no poner en riesgo su integridad.

## Backend

Se trata de una api REST a la cual podemos solicitar a sus endpoints la situación
de los distintos riesgos naturales en base a su localización.

Para obtener los datos de todos los riesgos naturales cercanos a la ubicación
del cliente:

```
/?latitude=41.659636&longitude=-0.907556&max_distance=300
```

Los datos que hay que mandar junto con la peticion `GET` son 

- longitud
- latitud
- max_distance: radio en el cual se marcan las incidencias como peligrosas

## Frontend

Es una singlepage application que utiliza jquery ajax para la obtención de los datos
del servidor. 

Una vez obtenidos los datos los ordena y los muestra al usuario de forma que este
pueda saber si está en peligro y en este caso que pasos debe seguir para ponerse 
a salvo.

Al mismo tiempo muestra en una interfaz de mapa la localizción exacta de las 
incidencias respecto a la posición del usuario.
