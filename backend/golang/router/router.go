package router

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller"
	"github.com/km1110/calendar-app/backend/golang/middleware"
	"github.com/km1110/calendar-app/backend/golang/model"
)

func Router(db *sql.DB) *gin.Engine {
	router := gin.Default()
	router.Use(middleware.Cors())
	router.Use(middleware.RateLimiterMiddleware())

	// modelの初期化
	um := model.NewUserModel(db)
	tm := model.NewTodoModel(db)
	pm := model.NewProjectModel(db)
	tgm := model.NewTagModel(db)
	sm := model.NewScheduleModel(db)
	dm := model.NewDiaryModel(db)

	// controllerの初期化
	uc := controller.NewUserController(um)
	tc := controller.NewTodoController(tm, um)
	pc := controller.NewProjectController(pm, um)
	tgc := controller.NewTagController(tgm, um)
	sc := controller.NewScheduleController(sm, um)
	dc := controller.NewDiaryController(dm, um)

	initHealthRouter(router)

	firebaseRequiredGroup := router.Group("/")
	firebaseRequiredGroup.Use(middleware.FirebaseAuth())
	{
		initUserRouter(firebaseRequiredGroup, uc)
		initScheduleRouter(firebaseRequiredGroup, sc)
		initTodoRouter(firebaseRequiredGroup, tc)
		initProjectRouter(firebaseRequiredGroup, pc)
		initTagRouter(firebaseRequiredGroup, tgc)
		initDiaryRouter(firebaseRequiredGroup, dc)
	}

	return router
}
