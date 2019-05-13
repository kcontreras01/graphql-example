// defining a class to represent the type Champion
// this class has the same fields defined in the schema for Champion

class Champion {
	constructor(name, attackDamage) {
		this.name = name
		this.attackDamage = attackDamage
	}
}

module.exports = Champion