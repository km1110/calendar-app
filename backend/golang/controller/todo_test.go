package controller

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/model/entities"
	"github.com/km1110/calendar-app/backend/golang/view/request"
	"github.com/km1110/calendar-app/backend/golang/view/response"
	"github.com/stretchr/testify/assert"
)

func toTime(t string) time.Time {
	d, _ := time.Parse("2006-01-02", t)
	return d
}

// モックのユーザーマネージャーとTODOマネージャーを定義
type mockUserManager struct{}

func (m *mockUserManager) GetUser(firebaseUID string) (string, error) {
	// モックのロジックを実装
	if firebaseUID == "validUID" {
		return "123456789", nil
	}
	return "", fmt.Errorf("invalid firebaseUID")
}

func (m *mockUserManager) AddUser(ctx context.Context, r entities.SignUp) (entities.SignUp, error) {
	// モックのロジックを実装
	if r.Firebase_uid == "validUID" {
		return entities.SignUp{
			Id:           "123456789",
			Firebase_uid: "validUID",
			Username:     "validUsername",
			Email:        "validEmail",
		}, nil
	}
	return entities.SignUp{}, fmt.Errorf("invalid firebaseUID")
}

type mockTodoManager struct{}

// todoのモックデータ
var test_todo = response.TodosResponse{
	Id:     "123456789",
	Name:   "validName",
	Date:   toTime("2021-01-01"),
	Status: false,
	Project: response.ProjectsResponse{
		Id:    "123456789",
		Title: "validName",
	},
	Tag: response.TagResponse{
		Id:   "123456789",
		Name: "validName",
	},
}

func (m *mockTodoManager) GetTodos(user_id string) ([]*response.TodosResponse, error) {
	if user_id == "123456789" {
		return []*response.TodosResponse{&test_todo}, nil
	}
	return nil, fmt.Errorf("invalid firebaseUID")
}

func (m *mockTodoManager) GetDailyTodos(user_id, start_date, end_date string) ([]*response.TodosResponse, error) {
	if user_id == "123456789" && start_date == "2021-01-01" && end_date == "2021-01-02" {
		return []*response.TodosResponse{&test_todo}, nil
	}
	return nil, fmt.Errorf("invalid firebaseUID")
}

func (m *mockTodoManager) GetDateCount(user_id string, start_year string, end_year string) ([]*entities.TodoDateCount, error) {
	if user_id == "123456789" && start_year == "2021-01-01" && end_year == "2022-01-01" {
		return []*entities.TodoDateCount{
			{
				Date:  toTime("2021-01-01"),
				Count: 1,
			},
		}, nil
	}
	return nil, fmt.Errorf("invalid firebaseUID")
}

func (m *mockTodoManager) AddTodos(ctx context.Context, user_id string, r request.CreateTodoRequest) (response.TodosResponse, error) {
	if user_id == "123456789" {
		return test_todo, nil
	}
	return response.TodosResponse{}, fmt.Errorf("invalid firebaseUID")
}

func (m *mockTodoManager) UpdateTodos(ctx context.Context, r response.TodosResponse) (response.TodosResponse, error) {
	if r.Id == "123456789" {
		return test_todo, nil
	}
	return response.TodosResponse{}, fmt.Errorf("invalid firebaseUID")
}

func (m *mockTodoManager) UpdateTodoStatus(ctx context.Context, id string, r request.UpdateTodoStatusRequest) (response.TodosResponse, error) {
	if id == "123456789" {
		return response.TodosResponse{
			Id:     "123456789",
			Status: true,
		}, nil
	}
	return response.TodosResponse{}, fmt.Errorf("invalid firebaseUID")
}

func (m *mockTodoManager) DeleteTodo(ctx context.Context, id string) error {
	if id == "123456789" {
		return nil
	}
	return fmt.Errorf("invalid firebaseUID")
}

func setupTest() (*todoController, *gin.Engine) {
	mockUM := &mockUserManager{}
	mockTM := &mockTodoManager{}

	tc := todoController{um: mockUM, tm: mockTM}

	gin.SetMode(gin.TestMode)
	r := gin.Default()

	r.GET("/todos", tc.FetchTodo)
	r.GET("/todos/day-count", tc.FetchTodoCount)
	r.POST("/todos", tc.CreateTodo)
	r.PATCH("/todos/:todo_id", tc.UpdateTodo)
	r.PATCH("/todos/:todo_id/status", tc.UpdateTodoStatus)
	r.DELETE("/todos/:todo_id", tc.DeleteTodo)

	return &tc, r
}

func TestFetchTodo(t *testing.T) {
	tc, _ := setupTest()

	// テストケースを定義
	tests := []struct {
		name            string
		firebaseUID     string
		expectedStatus  int
		expectedContent string
	}{
		{
			name:            "【正常系】1件以上取得",
			firebaseUID:     "validUID",
			expectedStatus:  http.StatusOK,
			expectedContent: `[{"id":"123456789","name":"validName","date":"2021-01-01T00:00:00Z","status":false,"project":{"id":"123456789","title":"validName"},"tag":{"id":"123456789","name":"validName"}}]`,
		},
		{
			name:            "【異常系】firebaseUIDが空",
			firebaseUID:     "",
			expectedStatus:  http.StatusBadRequest,
			expectedContent: `{"error":"firebaseUID not provided"}`,
		},
		{
			name:            "【異常系】firebaseUIDが不正",
			firebaseUID:     "invalidUID",
			expectedStatus:  http.StatusBadRequest,
			expectedContent: `{"error":"invalid firebaseUID"}`,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			req, _ := http.NewRequest("GET", "/todos", nil)
			resp := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(resp)
			c.Request = req

			if test.firebaseUID != "" {
				// gin.Contextに渡すために、リクエストヘッダーにfirebaseUIDをセット
				c.Set("firebaseUID", test.firebaseUID)
			}

			tc.FetchTodo(c)

			assert.Equal(t, test.expectedStatus, resp.Code)

			if resp.Body != nil {
				assert.Equal(t, test.expectedContent, resp.Body.String())
			}
		})
	}
}

func TestFetchTodoCount(t *testing.T) {
	tc, _ := setupTest()

	// テストケースを定義
	tests := []struct {
		name            string
		firebaseUID     string
		expectedStatus  int
		expectedContent string
	}{
		{
			name:            "【正常系】1件以上取得",
			firebaseUID:     "validUID",
			expectedStatus:  http.StatusOK,
			expectedContent: `[{"date":"2021-01-01T00:00:00Z","count":1}]`,
		},
		{
			name:            "【異常系】firebaseUIDが空",
			firebaseUID:     "",
			expectedStatus:  http.StatusBadRequest,
			expectedContent: `{"error":"firebaseUID not provided"}`,
		},
		{
			name:            "【異常系】firebaseUIDが不正",
			firebaseUID:     "invalidUID",
			expectedStatus:  http.StatusBadRequest,
			expectedContent: `{"error":"invalid firebaseUID"}`,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			req, _ := http.NewRequest("GET", "/todos/day-count?start=2021&end=2022", nil)
			resp := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(resp)
			c.Request = req

			if test.firebaseUID != "" {
				// gin.Contextに渡すために、リクエストヘッダーにfirebaseUIDをセット
				c.Set("firebaseUID", test.firebaseUID)
			}

			tc.FetchTodoCount(c)

			assert.Equal(t, test.expectedStatus, resp.Code)

			if resp.Body != nil {
				assert.Equal(t, test.expectedContent, resp.Body.String())
			}
		})
	}
}
