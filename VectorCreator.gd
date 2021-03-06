extends Area2D

class_name VectorCreator

signal vector_created(vector)

export var maximum_lenght := 200

var touch_down := false
var position_start := Vector2.ZERO
var position_end := Vector2.ZERO

var vector := Vector2.ZERO

func _ready() -> void:
	connect("input_event", self, "_on_input_event")

func _on_input_event(_viewport, event, _shape_idx) -> void:
	if event.is_action_pressed("ui_touch"):
		touch_down = true
		position_start = event.position

func _input(event) -> void:
	if not touch_down:
		return
		
	if event.is_action_released("ui_touch"):
		touch_down = false
		emit_signal("vector_created", vector)
		_reset()
		
	if event is InputEventMouseMotion:
		position_end = event.position
		vector = -(position_end - position_start).clamped(maximum_lenght)
		update()
		
func _draw() -> void:
	draw_line(position_start - global_position,
		(position_end - global_position),
		Color.blue,
		8)
		
	draw_line(position_start - global_position,
		(position_start - global_position + vector),
		Color.red,
		12)

func _reset():
	position_start = Vector2.ZERO
	position_end = Vector2.ZERO
	vector = Vector2.ZERO
	
	update()
