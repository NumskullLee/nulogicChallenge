const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const app=express();

const Corrida = mongoose.model('Corrida',{FechaSalida:String,
    HoraSalida:String,
    Destino:String,
    Asientos:[
        {
            num:Number,
            nombre:String
        }
    ]})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


mongoose
    .connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.MONGO_DOMINIO+':27017/'+process.env.DB_NAME)
    .then(() => {
      console.log('Mongodb connected....');
    })
    .catch(err => console.log(err.message));

app.get('/',(req,res)=>{
    res.json({response:'Pagina inicial'})
})

//Add
app.post('/add',(req,res)=>{
    const nuevaCorrida = new Corrida({
        FechaSalida:req.body.fechaSalida,
        HoraSalida:req.body.horaSalida,
        Destino:req.body.Destino,
        Asientos:[]
    })
    
    nuevaCorrida.save().then(doc=>{
        res.json({response:"Registro agregado"})
    }).catch(err=>{
        console.log("Error al guardar corrida ", err)
        res.json({response:'Error al guardar corrida'})
        
    })
})

//GetAll
app.get('/getAllCorridas',(req,res)=>{
    Corrida.find().then(doc=>{
        res.json({response:'success',data:doc})
    }).catch(err=>{
        console.log("Error al obtener todas las corridas ", err)
        res.json({response:'Error al obtener todas las corridas'})
    })
})

//getById
app.get('/getById',(req,res)=>{
    const lugares = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
    const ocupados = [];

    Corrida.findById(req.body.id).then(doc=>{
        for(let j=0; j<doc.Asientos.length; j++){
            ocupados.push(doc.Asientos[j].num);
        }
        res.json({response:'success',data:{general:doc, lugares: lugares.filter(espacio=>!ocupados.includes(espacio))}})
    }).catch(err=>{
        console.log("Error al obtener corrida ", err)
        res.json({response:'Error al obtener corrida'})
    })
})

//Reserva
app.post('/reservar',(req,res)=>{
    const id=req.body.id;
    const asiento=req.body.asiento;
    const nombre=req.body.nombre;
    
    Corrida.findById({_id:id}).then(doc=>{
        dt1=new Date();
        dt2=new Date(doc.FechaSalida+"T"+doc.HoraSalida);
        var diff=(dt2.getTime()-dt1.getTime())/1000;
        diff /= 60;
        if(Math.round(diff)>30){
            var obj = {"num":asiento, "nombre":nombre}
            Corrida.findOneAndUpdate({_id: id},{$push: {Asientos:obj}}).then(doc=>{
                res.json({response:'Asiento reservado con exito'})
            }).catch(err=>{
                console.log("Error al reservar asiento ", err)
                res.json({response:'Error al reservar asiento'})
            })
        }else{
            res.json({response:'No puedes reservar el asiento, faltan menos de 30 min para que salga el camion'})
        }
    }).catch(err=>{
        console.log("Error al obtener info de reservar asiento ", err)
        res.json({response:'Error al obtener info de reservar asiento'})
    })
    
});

//Eliminar reserva
app.post('/eliminarReserva', (req, res)=>{
    const id=req.body.id;
    const idasiento=req.body.idasiento;

    Corrida.findOneAndUpdate({_id:id},{$pull: {Asientos: {_id:idasiento}}}).then(doc=>{
        res.json({response:'Reserva eliminada correctamente'})
    }).catch(err=>{
        console.log("Error al obtener eliminar reserva", err)
        res.json({response:'Error al obtener eliminar reserva'})
    })

})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});
