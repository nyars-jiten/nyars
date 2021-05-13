<template>
  <v-container>
    <v-row>
      <!-- <v-col cols="12" md="3"> @mouseup="send" -->
        <canvas id="canvas" width="400" height="400" @click="send" style="border: 2px solid; cursor: crosshair;"></canvas>
      <!-- </v-col> -->
      <!-- <v-col cols="12" md="8"> -->
        <div class="control-block">
          <v-btn elevation="2" @click="send">Send</v-btn>
          <div class="control-buttons">
            <v-btn class="ma-2" outlined @click="undo">Отмена <v-icon right dark>mdi-undo</v-icon></v-btn>
            <!-- <v-btn class="ma-2" outlined @click="redo">Повтор <v-icon right dark>mdi-redo</v-icon></v-btn> -->
            <v-btn class="ma-2" outlined @click="erase">Очистить <v-icon right dark>mdi-eraser-variant</v-icon></v-btn>
          </div>
          <hr>
          <div class="result">
            <span class="result-char" v-for="char in result" :key="char" @click="addChar(char)">
              {{ char }}
            </span>
          </div>
        </div>
      <!-- </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import handwriting from '@/assets/js/handwriting.canvas.js'

export default {
  data: () => ({
    canvas: null,
    result: []
  }),
  methods: {
      undo() {
          this.canvas.undo();
          this.send();
      },
      redo() {
          this.canvas.redo();
      },
      erase() {
          this.canvas.erase();
          this.result = [];
      },
      send() {
          this.canvas.setOptions({language: 'ja'});
          this.canvas.recognize();
      },
      addChar(char) {
        this.$root.$emit('addSearchStr', char);
        this.erase();
      }
  },
  mounted() {
    this.canvas = new handwriting.Canvas(document.getElementById('canvas'), 3);
    this.canvas.setCallBack((data, err) => {
      if (err) throw err;
      else this.result = data;
    });
    this.canvas.set_Undo_Redo(true, true);

  },
};
</script>

<style lang="scss" scoped>
.control-block {
  padding-left: 20px;
}

.result-char {
  font-size: 150%;
  padding: 5px;
  cursor: pointer;
}
</style>
