extends RigidBody2D

var isOnWall := false;
var speed := 3

func _process(delta):
	if(isOnWall == false):
		var vel_x_a = pow(linear_velocity.x, 2)
		var vel_y_b = pow(linear_velocity.y, 2)
		var oldSpeed = pow(vel_x_a + vel_y_b, 1/2)
		var newSpeed = lerp(oldSpeed, 0, 0.02);
		var velocity = Vector2.ZERO;
		velocity.x = linear_velocity.x * (newSpeed / oldSpeed)
		velocity.y = linear_velocity.y * (newSpeed / oldSpeed)
		linear_velocity = velocity

func _on_wallChecker_body_entered(body: Node):
	if body.is_in_group("wall"): 
		SetIsOnWall(true)
		return
		
	if body.is_in_group("ball") && body.get_instance_id() != get_instance_id():
		SetIsOnWall(true)

func _on_wallChecker_body_exited(body: Node):
	if body.is_in_group("wall"): 
		SetIsOnWall(false)
		return
		
	if body.is_in_group("ball") && body.get_instance_id() != get_instance_id():
		SetIsOnWall(false)
		
func SetIsOnWall(isOnWall: bool):
	self.isOnWall = isOnWall

func _on_TouchController_vector_created(force: Vector2):
	linear_velocity = force * speed
