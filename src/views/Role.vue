<template>
  <div id="role">
    <!--obtener datos-->
    <div class="contenedor">
      <div class="form-group">
        <input type="hidden" v-model="id">
       
        <label class="form-label mt-1">Código</label>
        <input type="text" class="form-control" v-model="codigo" placeholder="Ingrese el código">

        <label class="form-label mt-1">Nombre</label>
        <input type="text" class="form-control" v-model="nombre" placeholder="Ingrese primer nombre">

        <label class="form-label mt-1">Estado</label>
        <select class="form-select" v-model="estado" placeholder="Seleccione estado">
          <option disabled value="">--Seleccione--</option>
          <option value="1">Activo</option>
          <option value="0">Inactivo</option>
        </select>
      </div>

      <!--botones-->
      <div class="form-group">
        <br>
        <button class="btn btn-primary" @click="Agregar">Guardar</button>
        <button class="btn btn-primary" @click="Modificar">Modificar</button>
      </div>

      <!--resutlado-->
      <div>
        <br>
        <table class="table table-primary">
          <thead>
            <tr>
              <th>Id</th>
              <th>Código</th>
              <th>Nombre</th>              
              <th>Estado</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in listData" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.codigo }}</td>
              <td>{{ item.nombre }}</td>              
              <td>{{ item.estado==true?'Activo':'Inactivo' }}</td>              
              <td><button @click="findByid(item.id)">➤</button></td>
              <td><button @click="deleteById(item.id)">➤</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegistroRol',
  data() {
    return {
      id: 0,
      codigo: '',
      nombre: '',
      estado: '',
      listData: []
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    findByid: function (id) {
      // metodo para consutlar por el ig del boton impreso en la vista
      axios.get('http://localhost:9000/security/rol/' + id).then(result => {
        this.id = result.data.id;
        this.codigo = result.data.codigo;
        this.nombre = result.data.nombre;
        this.estado = (result.data.estado==true?'1':'0');
      })
    },
    Agregar: function () {
      let data = {        
        codigo: this.codigo,
        nombre: this.nombre,
        estado: parseInt(this.estado)
      };
      axios.post('http://localhost:9000/security/rol', data).then(result => {
        if (result.data) {
          alert('El registro se guardó de forma correcta.');
          this.loadData();
          this.clearList();
        }
      });

    },
    Modificar: function () {
      let data = {
        id: this.id,
        codigo: this.codigo,
        nombre: this.nombre,
        estado: parseInt(this.estado)
      };

      axios.put('http://localhost:9000/security/rol/' + this.id, data).then(result => {
        if (result.data) {
          alert('El registro se modificó de forma correcta.');
          this.loadData();
          this.clearList();
        }
      });

    },
    deleteById: function (id) {
      axios.delete('http://localhost:9000/security/rol/' + id,).then(() => {
        alert('El registro se eliminó de forma correcta.');
        this.loadData();
        this.clearList();
      });
    },
    loadData: function () {
      axios.get('http://localhost:9000/security/rol').then(result => {
        this.listData = result.data
      })
    },
    clearList: function () {
      this.id = '';     
      this.codigo = '';
      this.nombre = '';
      this.estado = '';
    }
  },
}
</script>

<style>
.contenedor {
  margin-top: 2%;
  margin-left: 5%;
  margin-right: 5%;
}
</style>