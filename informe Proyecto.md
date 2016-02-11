Informe Proyecto de Comunicaciones II
========
### CHAT IPv6

El proyecto está hecho sobre [NodeWebkit](http://nwjs.io/) el cual es un wrapper del navegador chromium que funciona sobre el motor de Javascript V8, por tal motivo toda la programación lógica del proyecto fue realizada sobre Javascript. Para realizarlo primero se planteó cómo sería la estructura de la siguiente forma:

* Se decidió que el que creará la sala funcionaria como el servidor del chat de grupo y el que se uniera a la misma sería un cliente.

* Se definio que los mensajes serian transportados sobre el protocolo UDP

* Para anunciar la sala se haría un anuncio cada cierto tiempo mediante un Multicast por un puerto definido.

* Para los mensajes privados se establecio un mensaje de tipo Unicast

* Para establecer qué clientes están conectados, los mismos luego de conectarse envían un mensaje muy similar al router advertising para mostrarle a sus vecinos los cuales son los clientes conectados a la misma sala que ellos también están conectados.

* A Cada mensaje de advertising (Anuncio de la Sala y Anuncio de Cliente conectado) se le estableció un intervalo de 5 segundos.

* Todos los mensajes utilizados  están en formato JSON.  

* Se definieron diferentes tipos de mensaje para la comunicación,descritos a continuación.

## Tipos de Mensajes

* **cod** : Define el tipo de Mensaje
* **room** : Estructura básica de una sala, la cual sería Nombre, un identificador unico y los Usuarios Conectados (Solo usado en el anuncio de Sala).
* **user**: Estructura básica de un usuario.
* **message**: Contenido del mensaje enviado por un usuario hacia una sala o hacia un usuario en especifico.


### Anunciar Sala (Multicast)


```
data = {
  cod : 10,
  room : {name: "ComuII",
          id: "7asdasda54zxczxc",
          ip: "fe80::ff:fe:1234",
          usersConnected : [{ id: "asdasdasd", ip: "fe80::ff:fe:1234", name: "JOSE"},
                            { id: "sdsasw", ip: "fe80::ff:fe:34af", name: "Luis"}] }     
};
```

### Anunciar Usuario en Sala (Multicast)

```
data = {
  cod : 11,
  room : {name: "ComuII", id: "7asdasda54zxczxc", ip: "fe80::ff:fe:1234"}
  user: { id: "asdasdasd" ip: "fe80::ff:fe:1234", name: "JOSE"}      
};
```


### Enviar Mensaje de Grupo (Multicast)

```
data = {
  cod : 20,
  room : {name: "ComuII", id: "7asdasda54zxczxc", ip: "fe80::ff:fe:1234"},
  user: {name: "JOSE", id: "asdasdasd" ip: "fe80::ff:fe:1234"},
  message: "Buenos días"
};
```

### Enviar Mensaje Directo  (Unicast)

```
data = {
  cod : 21,
  room : {name: "ComuII", id: "7asdasda54zxczxc", ip: "fe80::ff:fe:1234"},
  user: {name: "JOSE", id: "asdasdasd" ip: "fe80::ff:fe:1234"},
  message: "Hola soy jose"     
};
```

### Anuncio de Desconexión  (Multicast)

```
data = {
  cod : 31,
  room : {name: "ComuII", id: "7asdasda54zxczxc", ip: "fe80::ff:fe:1234"},
  user: {name: "Pedro", id: "asdasdasd" ip: "fe80::ff:fe:1234"},     
};
```

## Funcionamiento

1. Se crea una sala.
2. La sala anuncia su presencia en la red mediante un mensaje Multicast.
3. Los clientes recibirán el mensaje de anuncio de sala y podrán conectarse a ella si lo desean.
4. Cuando un cliente se conecta a dicha sala, desde ese instante empieza a enviar un mensaje muy similar al advertising (Anunciar Usuario en Sala) para anunciar que se encuentra conectado.
5. Luego de tal anuncio, tanto el creador de la sala como los demás clientes podrán notar su presencia en el panel de usuarios conectados.
6. A partir de este momento ya se podrá enviar tanto mensajes de grupo a la sala, como mensajes privados a un usuario en específico.

>Realizado por :
1. **José Roa**  
2. **Luis Villalobos**
3. **Franco Ramírez**
4. **Julio Carreño**
