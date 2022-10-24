// Soldier
class Soldier {
    constructor(health, strength) {
        this.health = health;
        this.strength = strength;
    }

    attack() {
        return this.strength;
    }

    receiveDamage(damage) {
        this.health -= damage;
    }
}

// Viking
class Viking extends Soldier{
    constructor(name, health, strength) {
        super(health, strength);
        this.name = name;
    }
    
    receiveDamage(damage) {
        super.receiveDamage(damage);
        return this.health > 0
            ? `${ this.name } has received ${ damage } points of damage`
            : `${ this.name } has died in act of combat`;
    }
    
    battleCry(){
        return "Odin Owns You All!";
    }

}

// Saxon
class Saxon extends Soldier {
    attack() {
        return this.strength;
    }
    
    receiveDamage(damage) {
        super.receiveDamage(damage);
        return this.health > 0
            ? `A Saxon has received ${ damage } points of damage`
            : `A Saxon has died in combat`;
    }
}

// War
class War {
    constructor() {
        /** @type { Array.<Saxon> } */
        this.vikingArmy = [];
        /** @type { Array.<Viking> } */
        this.saxonArmy = [];
    }
    
    addViking(viking){
        this.vikingArmy.push(viking);
    }

    addSaxon(saxon){
        this.saxonArmy.push(saxon);
    }

    vikingAttack(){
        return this.attack(this.vikingArmy, this.saxonArmy);
    }

    saxonAttack(){
        return this.attack(this.saxonArmy, this.vikingArmy);
    }

    showStatus(){
        let result;
        if (!this.saxonArmy.length){
            result = "Vikings have won the war of the century!";
        } else if(!this.vikingArmy.length) {
            result = "Saxons have fought for their lives and survived another day...";
        } else {
            result = "Vikings and Saxons are still in the thick of battle."
        }
        return result;
    }
    
    attack(attackingArmy, attackedArmy){
        const attackedSoldierIndex = Math.floor(Math.random() * attackedArmy.length);
        const attackedSoldier = attackedArmy[attackedSoldierIndex];

        const attackingSoldierIndex = Math.floor(Math.random() * attackingArmy.length);
        const attackingSoldier = attackingArmy[attackingSoldierIndex];

        const result = attackedSoldier.receiveDamage(attackingSoldier.strength);

        if (attackedSoldier.health <= 0){
            attackedArmy.splice(attackedSoldierIndex, 1);
        } else {
            attackedArmy[attackedSoldierIndex] = attackedSoldier;
        }

        return result;
    }
}
