new Vue({
    el: "#app",
    data: {
        player_heal: 100,
        monster_heal: 100,
        logs: [],
        game_is_on: false,
        attack_multiple: 10,
        special_attack_multiple: 25,
        heal_up_multiple: 20,
        monster_attack_multiple: 25,
        log_text: {
            attack: "Oyuncu Atağı : ",
            special_attack: "Özel Oyuncu Atağı : ",
            monster_attack: "Canavar Atağı : ",
            heal_up: "İlk Yardım : ",
            give_up: "Pes Etti!",
        }
    },

    methods: {
        start_game: function () { // Yeni Oyun
            this.game_is_on = true;
        },

        attack: function () { // Saldır
            var point = Math.ceil(Math.random() * this.attack_multiple)
            this.monster_heal -= point;
            this.add_to_log({ turn: "p", text: this.log_text.attack + point })
            this.monster_attack();


            console.log("Player :" + this.player_heal);
            console.log("Canavar : " + this.monster_heal);

        },

        special_attack: function () { // Özel Saldırı
            var point = Math.ceil(Math.random() * this.special_attack_multiple)
            this.monster_heal -= point;
            this.add_to_log({ turn: "p", text: this.log_text.special_attack + point })
            this.monster_attack();


            console.log("Player :" + this.player_heal);
            console.log("Canavar : " + this.monster_heal);
        },

        heal_up: function () { // Can Bas
            var point = Math.ceil(Math.random() * this.heal_up_multiple)
            this.player_heal += point;
            this.add_to_log({ turn: "p", text: this.log_text.heal_up + point })
            this.monster_attack();


            console.log("Player :" + this.player_heal);
            console.log("Canavar : " + this.monster_heal);
        },

        give_up: function () { // Pes Et
            this.player_heal = 0;
            this.add_to_log({ turn: "p", text: this.log_text.give_up })


            console.log("Player : " + this.player_heal + " Pes ettiği için Kaybetti! :(");
            console.log("Canavar : " + this.monster_heal + " Can ile Canavar Kazandı! :)");
        },

        monster_attack: function () { // Canavarın Saldırması
            var point = Math.ceil(Math.random() * this.monster_attack_multiple)
            this.player_heal -= point;
            this.add_to_log({ turn: "m", text: this.log_text.monster_attack + point })
        },

        // Fonksiyona gelen verileri logs array'e ekle.
        add_to_log: function (log) {
            this.logs.push(log);
        }



    },

    watch: {
        // player_heal property içerisindeki değeri kontrol sağlar. 
        player_heal: function (value) {
            // Canı 0 olduğunda;
            if (value <= 0) {
                this.player_heal = 0;

                // Çıkan pencerede Tamam denilir ise aşağıdaki işlem devreye girer.
                if (confirm("Oyunu KAYBETTİN. Tekrar oynamak ister misin?")) {
                    this.player_heal = 100,
                        this.monster_heal = 100;
                    this.logs = []; // Logları temizle.
                }
            }
            else if (value >= 100) {
                this.player_heal = 100;
            }
        },

        // monster_heal property içerisindeki değeri kontrol sağlar. 
        monster_heal: function (value) {
            if (value <= 0) {
                this.monster_heal = 0;
                if (confirm("Oyunu KAZANDIN. Tekrar oynamak ister misin?")) {
                    this.player_heal = 100,
                        this.monster_heal = 100;
                    this.logs = []; // Logları temizle.
                }
            }
        }
    },

    computed: {
        user_progress: function () {
            return {
                width: this.player_heal + "%"
            }
        },

    monster_progress: function () {
            return {
                width: this.monster_heal + "%"
            }
        }
    }

})