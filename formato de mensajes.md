###Anunciar Sala

```
data = {
  COD : 10,
  SALA: {
         ID: '7asdasda54zxczxc',
         NOMBRE: "SALA1",
         USUARIOS: [{IP:"fe80::ff:fe:1234", NOMBRE:"JOSE"},
                    {IP:"fe80::ff:fe:4234", NOMBRE:"PEDRO"}]      
};
```

### Anunciar Conexion a la Sala

```
data = {
  COD : 11,
  IDSALA : "7asdasda54zxczxc"
  USUARIO: {IP: "fe80::ff:fe:1234", NOMBRE: "JOSE"}      
};
```



###Solicitar Conexion Unicast

```
data = {
  COD : 12,
  USUARIO: {IP: "fe80::ff:fe:1234", NOMBRE: "JOSE"}      
};
```


### Enviar Mensaje Multicast

```
data = {
  COD : 20,
  IDSALA : '7nisod648dhwuw'
  USUARIO: {IP: "fe80::ff:fe:1234", NOMBRE: "JOSE"},
  MENSAJE: "Buenos días"
};
```

###Enviar Mensaje Unicast

```
data = {
  COD : 21,
  USUARIO: {IP: "fe80::ff:fe:1234", NOMBRE: "JOSE"}
  MENSAJE: "Soy jose"      
};
```