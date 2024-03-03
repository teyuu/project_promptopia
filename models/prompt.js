import {Schema, model, models} from "mongoose";

const PromptSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    prompt:{
        type:String,
        require:[true, 'Prompt is requiered ']
    },
    tag:{
        type:String,
        require:[true, 'Tag is requiered ']
    }
})


const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt;