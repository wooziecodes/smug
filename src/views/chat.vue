

<template>
    <div class="container-fluid" style="background-color: #CEE1E6; height: 64px;">
        NAV BAR
    </div>
    <div class="row" style="margin-top: 30px; margin-left: 5%; margin-right: 5%">
        <div class="chat" ref="talkjs" style="width: 70%; height: 800px;">
            <i>Loading chat...</i>
        </div>

            <div class="col">
              <!-- <div class="container" style="background-color: #CEE1E6"></div>
              <br> -->
              <div class="container" style="background-color: #E9EFF4; padding: 20px">
                <div id="booking" style="background-color: transparent;">
                    
                  <h6 style="text-align: left; background-color: transparent;">Selected module</h6>
                    <div class="btn-group" id="module-selection" style="width: 100%">
                      <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: white">
                        Please select a module
                      </button>
                      <ul class="dropdown-menu" style="width: 100%;">
                        <li ><a class="dropdown-item" href="IS111" id="IS111">IS111: Intro to Programming</a></li>
                        <li><a class="dropdown-item" href="IS112" id="IS112">IS112: Database Management</a></li>
                        <li><a class="dropdown-item" href="IS113" id="IS113">IS113: Web Application Development 1</a></li>
                      </ul>
                    </div>
                    <br><br>

                    <h6 style="text-align: left; background-color: transparent;">Selected date</h6>
                    <div class="btn-group" id="date-selection" style="width: 100%">
                      <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: white">
                        Please select tuition date
                      </button>
                      <ul class="dropdown-menu" style="width: 100%;">
                        <li ><a class="dropdown-item" href="IS111" id="IS111">IS111: Intro to Programming</a></li>
                        <li><a class="dropdown-item" href="IS112" id="IS112">IS112: Database Management</a></li>
                        <li><a class="dropdown-item" href="IS113" id="IS113">IS113: Web Application Development 1</a></li>
                      </ul>
                    </div>
                    <br><br>

                    <div class="row">
                      <div class="col-6">
                        <h6 style="text-align: left; background-color: transparent;">Selected Time</h6>
                        <div class="btn-group" id="date-selection" style="width: 100%">
                          <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: white">
                            Please select time
                          </button>
                          <ul class="dropdown-menu" style="width: 100%;">
                            <li ><a class="dropdown-item" href="IS111" id="IS111">IS111: Intro to Programming</a></li>
                            <li><a class="dropdown-item" href="IS112" id="IS112">IS112: Database Management</a></li>
                            <li><a class="dropdown-item" href="IS113" id="IS113">IS113: Web Application Development 1</a></li>
                          </ul>
                        </div>
                      </div>

                      <div class="col-6">
                        <h6 style="text-align: left; background-color: transparent;">Length of Session</h6>
                        <div class="btn-group" id="date-selection" style="width: 100%">
                          <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: white">
                            Please select length
                          </button>
                          <ul class="dropdown-menu" style="width: 100%;">
                            <li ><a class="dropdown-item" href="IS111" id="IS111">IS111: Intro to Programming</a></li>
                            <li><a class="dropdown-item" href="IS112" id="IS112">IS112: Database Management</a></li>
                            <li><a class="dropdown-item" href="IS113" id="IS113">IS113: Web Application Development 1</a></li>
                          </ul>
                        </div>
                      </div>

                      <br><br><br>

                      <h6 style="text-align: left; background-color: transparent;">Selected date</h6>
                        <div class="btn-group" id="date-selection" style="width: 100%">
                          <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: white">
                            Please select tuition fee
                          </button>
                          <ul class="dropdown-menu" style="width: 100%;">
                            <li ><a class="dropdown-item" href="IS111" id="IS111">IS111: Intro to Programming</a></li>
                            <li><a class="dropdown-item" href="IS112" id="IS112">IS112: Database Management</a></li>
                            <li><a class="dropdown-item" href="IS113" id="IS113">IS113: Web Application Development 1</a></li>
                          </ul>
                        </div>

                      </div>
                      <br><br>
                
                <button type="button" class="btn" style="background-color: #1F5C64; height: 50px; color: white; width: 100%">Confirm Booking</button>

              </div>
              </div>
            </div>
        
        </div>

</template>

<script>
    import Talk from 'talkjs';
    export default {
        name: 'Chat',
        props: {
            currentUser: {
              type: Object,
              required: false
          }
        },
        async mounted() {
          await Talk.ready
          const me = new Talk.User({
            id: "555",
            name: "Choi",
            email: "choi@gmail.com",
            welcomeMessage: "Hey there! How are you? :-)",
            role: "booker"
          })
                
          const talkSession = new Talk.Session({
            appId: 'tn3myYa0',
            me: me,
          });

          const other = new Talk.User({
            id: '654321',
            name: 'Sebastian',
            email: 'Sebastian@example.com',
            photoUrl: 'https://demo.talkjs.com/img/sebastian.jpg',
            welcomeMessage: 'Hey, how can I help?',
            role: 'default',
          });

          const conversation = talkSession.getOrCreateConversation(
            Talk.oneOnOneId(me, other)
          );

          conversation.setParticipant(me);
          conversation.setParticipant(other);

          const inbox = talkSession.createInbox();
          inbox.select(conversation);

          inbox.mount(this.$refs.talkjs);
  
        }
    }


</script>

<style>
  #IS111, #IS112, #IS113{
    background-color: white;
  }

  #IS111:hover, #IS112:hover, #IS113:hover{
    background-color: #CEE1E6;
  }
</style>