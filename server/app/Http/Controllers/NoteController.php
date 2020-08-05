<?php

namespace App\Http\Controllers;
use JWTAuth;
use App\models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $notes = $this->user->notes()->get(["id", "title", "text", "created_by"])->toArray();

        return $notes;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            "title" => "required",
            "text" => "required"
        ]);
    
        $note = new Note();
        $note->title = $request->title;
        $note->text = $request->text;
    
        if ($this->user->notes()->save($note)) {
            return response()->json([
                "status" => true,
                "note" => $note
            ]);
        } else {
            return response()->json([
                "status" => false,
                "message" => "Ops, note could not be saved."
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\models\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function show( Note $note)
    {
        $note = Note::findOrFail($note->id);

        return $note;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\models\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function edit(Note $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\models\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Note $note)
    {
        $this->validate($request, [
            "title" => "required",
            "text" => "required"
        ]);
    
        $note->title = $request->title;
        $note->text = $request->text;
    
        if ($this->user->notes()->save($note)) {
            return response()->json([
                "status" => true,
                "note" => $note
            ]);
        } else {
            return response()->json([
                "status" => false,
                "message" => "Ops, note could not be updated."
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\models\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function destroy(Note $note)
    {
        if ($note->delete()) {
            return response()->json([
                "status" => true,
                "note" => $note
            ]);
        } else {
            return response()->json([
                "status" => false,
                "message" => "Ops, note could not be deleted."
            ]);
        }
    }
}
