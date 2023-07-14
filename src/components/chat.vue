<template>
  <v-container>
    <h1 class="text-center">Brocken_Heart_Chat - <span v-if="connection_ready" class="connection-ready">Connection ready!</span></h1>

    <v-card class="message-container" ref="messages">
      <h2 v-if="connection_error" class="error">Connection error!</h2>
      <v-row v-for="(m, idx) in messages" :key="'m-' + idx">
        <v-col :class="{'text-right': m.from === 'me', 'text-left': m.from === 'other'}">
          <v-card :class="{'mine-message-card': m.from === 'me', 'others-message-card': m.from === 'other'}">
            <v-card-text class="message-info">
              <v-row no-gutters align="center" justify="space-between">
                <v-col class="marinchat" cols="auto">
                  <v-avatar size="30">
                    <span class="nickname-initials">{{ m.nicknameInitials }}</span>
                  </v-avatar>
                </v-col>
                <v-col class="marinchat">
                  <div class="nickname">{{ m.othername }}</div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text class="message-text">{{ m.message }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-text-field v-model="new_message" outlined placeholder="Type a message" @keyup.enter="send_message"></v-text-field>
  </v-container>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'chat',

  data() {
    return {
      sockets_bay_api_key: 'f993fd9071684759e039cd9b87da11d4',
      connection_ready: false,
      connection_error: false,
      nicknames: [],
      websocket: null,
      new_message: '',
      messages: [],
      nickname: '',
      nickname1: ''
    };
  },

  methods: {
    init_chat() {
      if (this.nickname === '') {
        this.nickname = prompt('Enter a nickname:');
      }

      const sockets_bay_url = `wss://socketsbay.com/wss/v2/1/${this.sockets_bay_api_key}/`;
      this.websocket = new WebSocket(sockets_bay_url);

      this.websocket.onopen = this.onSocketOpen;
      this.websocket.onmessage = this.onSocketMessage;
      this.websocket.onerror = this.onSocketError;
    },
    onSocketOpen() {
      this.connection_ready = true;
    },
    onSocketMessage(evt) {
      const received = JSON.parse(evt.data);
      this.messages.push({ from: 'other', message: received.message, othername: received.othername, nicknameInitials: received.nicknameInitials });
      this.$nextTick(() => {
        const messages_div = this.$refs.messages;
        if (messages_div) {
          messages_div.scrollTop = messages_div.scrollHeight;
        }
      });
    },
    onSocketError() {
      this.connection_error = true;
    },
    send_message() {
      const to_send = { from: this.nickname, message: this.new_message, othername: this.nickname, nicknameInitials: this.getInitials(this.nickname) };
      this.websocket.send(JSON.stringify(to_send));
      this.messages.push({ from: 'me', message: this.new_message, othername: this.nickname , nicknameInitials: this.getInitials(this.nickname) });
      console.log(this.getInitials(this.nickname))
      this.new_message = '';
    },
    getInitials(name) {
      const nameParts = name.split(' ');
      if (nameParts.length === 1) {
        return nameParts[0].charAt(0).toUpperCase();
      } else if (nameParts.length > 1) {
        return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
      }
      return '';
    }
  },
  mounted() {
    this.init_chat();
  }
};
</script>

<style scoped>
h1 {
  padding: 0;
  height: 20px;
  font-size: 20px;
  text-transform: uppercase;
}
.connection-ready {
  color: greenyellow;
}

.message-container {
  height: 80vh;
  overflow-y: auto;
  background: url(@/assets/blood.jpg) no-repeat center;
  background-size: cover;
}

.mine-message-card {
  border-radius: 8px;
  max-width: 500px;
  font-size: 16px;
  color: #fff;
  padding: 4px;
  margin: 4px 0;
  background-color: #0288d1;
  float: right;

}

.others-message-card {
  border-radius: 8px;
  max-width: 500px;
  font-size: 16px;
  color: #000;
  padding: 4px;
  margin: 4px 0;
  background-color: #e0e0e0;
  float: left;
}

.message-info {
  padding-bottom: 4px;
}

.nickname {
  font-size: 14px;
  font-weight: bold;
  margin-left: 8px;
}

.nickname-initials {
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  background-color: #bdbdbd;
  color: #ce4545;
}

.message-text {
  margin-top: 8px;
}

.text-right {
  text-align: right;
}

.text-left {
  text-align: left;
}

.marinchat{
  margin-top:-25px;
  margin-bottom: -25px;
}
</style>
