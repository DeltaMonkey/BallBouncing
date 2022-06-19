extends VectorCreator

func _process(delta):
	var player: RigidBody2D = get_parent()
	rotation_degrees = -player.rotation_degrees
