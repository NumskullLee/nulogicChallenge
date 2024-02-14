
# Nulogic Challenge

Este programa es una pequeña poc parte del Challenge de Nulogic resuelto en JavaScript (node.js y mongoDB) que corre en el puerto 3000, el cual nos plantea la siguiente problematica.

Una importante empresa de transporte requiere mejorar su sistema de reserva y confirmación
de boletos. Para ello, se tiene pensado implementar las siguientes reglas de negocio:
- No se podrá reservar un asiento si el tiempo es menor a 30 minutos de la salida de la corrida.

Para los efectos de esta POC, se asume que cada corrida tiene 22 asientos disponibles. Se
solicita al candidato la creación de una POC con los siguientes endpoints:

-Crear corrida, la cual reciba como parámetro la fecha y hora de salida.
- Listar todas las corridas.
- Listar una corrida por id, donde se indique la disponibilidad de los asientos.
- Reservar un asiento de una corrida.
- Eliminar una reserva


## API Reference

#### Agregar nueva corrida

```http
 POST /add
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fechaSalida` | `string` | **Required**. Fecha en que saldra la corrida con el formato YYYY-MM-DD ej:(2024-02-14) |
| `horaSalida` | `string` | **Required**. Hora en que saldra la corrida con el formato hh:mm:ss ej:(15:00:00) |

#### Obtener todas las corridas

```http
 GET /getAllCorridas
```

#### Obtener una corrida por ID

```http
 GET /getById
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id de la corrida que se obtendran la disponibilidad de asientos y los datos generales de la corrida |

#### Reservar

```http
 POST /reservar
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id de la corrida donde se reservara el asiento |
| `asiento` | `number` | **Required**. numero de asiento que sera resrvado |
| `nombre` | `string` | **Required**. nombre de la persona que reservo el asiento |

#### Eliminar Reserva

```http
 POST /eliminarReserva
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id de la corrida donde se eliminara la resreva |
| `idasiento` | `string` | **Required**. id del asiento que dejara de estar reservado |






