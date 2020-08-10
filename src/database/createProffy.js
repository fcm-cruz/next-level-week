module.exports = async function (db, {proffyValue, classValue, classScheduleValues}){
    //  Inserir dados na table of teachers
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name, 
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

     //  Inserir dados na table of class
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)
    
    const class_id = insertedClass.lastID

     //  Inserir dados na table of class_schedule
     const insertedAllclassScheduleValues = classScheduleValues.map((classScheduleValue)=>{
         return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weeday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            ); 
         `)
     })

    //  Aqui vai executat todos os db.runs() das class_schedule
    // await Promise.all(insertedAllclassScheduleValues)

}