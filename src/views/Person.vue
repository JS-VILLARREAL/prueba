<template>
  <div id="person">
    <!--obtener datos-->
    <div class="contenedor">
      <div class="form-group">
        <input type="hidden" v-model="id">

        <label class="form-label mt-1">Tipo Documento</label>
        <select class="form-select" v-model="tipoDocumento" placeholder="Seleccione nombre">
          <option disabled value="">--Seleccione--</option>
          <option value="CC">CC</option>
          <option value="TI">TI</option>
        </select>

        <label class="form-label mt-1">Documento</label>
        <input type="text" class="form-control" v-model="documento" placeholder="Ingrese su documento">

        <label class="form-label mt-1">Primer Nombre</label>
        <input type="text" class="form-control" v-model="primerNombre" placeholder="Ingrese primer nombre">

        <label class="form-label mt-1">Segundo Nombre</label>
        <input type="text" class="form-control" v-model="segundoNombre" placeholder="Ingrese segundo nombre">

        <label class="form-label mt-1">Primer Apellido</label>
        <input type="text" class="form-control" v-model="primerApellido" placeholder="Ingrese primero apellido">

        <label class="form-label mt-1">Segundo Apellido</label>
        <input type="text" class="form-control" v-model="segundoApellido" placeholder="Ingrese segundo apellido">

        <label class="form-label mt-1">Correo</label>
        <input type="text" class="form-control" v-model="correo" placeholder="Ingrese correo">

        <label class="form-label mt-1">Celular</label>
        <input type="text" class="form-control" v-model="celular" placeholder="Ingrese celular">

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
              <th>Tipo Docuemnto</th>
              <th>Docuemnto</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Celular</th>
              <th>Estado</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in listData" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.tipoDocumento }}</td>
              <td>{{ item.documento }}</td>
              <td>{{ item.primerNombre }} {{ item.segundoNombre }} {{ item.primerApellido }} {{ item.segundoApellido }}</td>
              <td>{{ item.correo }}</td>
              <td>{{ item.celular }}</td>
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
  name: 'RegistroPersona',
  data() {
    return {
      id: 0,
      tipoDocumento: '',
      documento: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      correo: '',
      celular: '',
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
      axios.get('http://localhost:9000/security/person/' + id).then(result => {
        this.id = result.data.id;
        this.tipoDocumento = result.data.tipoDocumento;
        this.documento = result.data.documento;
        this.primerNombre = result.data.primerNombre;
        this.segundoNombre = result.data.segundoNombre;
        this.primerApellido = result.data.primerApellido;
        this.segundoApellido = result.data.segundoApellido;
        this.correo = result.data.correo;
        this.celular = result.data.celular;
        this.estado = (result.data.estado == true ? '1' : '0');
      })
    },
    Agregar: function () {
      let data = {
        tipoDocumento: this.tipoDocumento,
        documento: this.documento,
        primerNombre: this.primerNombre,
        segundoNombre: this.segundoNombre,
        primerApellido: this.primerApellido,
        segundoApellido: this.segundoApellido,
        correo: this.correo,
        celular: this.celular,
        estado: parseInt(this.estado)
      };
      axios.post('http://localhost:9000/security/person', data).then(result => {
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
        tipoDocumento: this.tipoDocumento,
        documento: this.documento,
        primerNombre: this.primerNombre,
        segundoNombre: this.segundoNombre,
        primerApellido: this.primerApellido,
        segundoApellido: this.segundoApellido,
        correo: this.correo,
        celular: this.celular,
        estado: parseInt(this.estado)
      };

      axios.put('http://localhost:9000/security/person/' + this.id, data).then(result => {
        if (result.data) {
          alert('El registro se modificó de forma correcta.');
          this.loadData();
          this.clearList();
        }
      });

    },
    deleteById: function (id) {
      axios.delete('http://localhost:9000/security/person/' + id,).then(() => {
        alert('El registro se eliminó de forma correcta.');
        this.loadData();
        this.clearList();
      });
    },
    loadData: function () {
      axios.get('http://localhost:9000/security/person').then(result => {
        this.listData = result.data
      })
    },
    clearList: function () {
      this.id = '';
      this.tipoDocumento = '';
      this.documento = '';
      this.primerNombre = '';
      this.segundoNombre = '';
      this.primerApellido = '';
      this.segundoApellido = '';
      this.correo = '';
      this.celular = '';
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